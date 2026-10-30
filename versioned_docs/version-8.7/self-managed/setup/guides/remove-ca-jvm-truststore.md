---
id: remove-ca-jvm-truststore
title: "Remove a CA from the JVM truststore"
description: "Replace the JVM truststore of the Camunda Java components with a copy that doesn't contain a CA."
---

To stop the Camunda Java components from trusting a CA that is in the image's default truststore, replace the truststore. The Helm chart has no option to remove a CA from the image truststore.

The procedure copies the image truststore without the listed CAs. It stores the copy in a Secret. Then it points each Java component to the copy with `-Djavax.net.ssl.trustStore`. Use it as an interim measure until you upgrade to images that no longer contain the CAs.

Don't combine this procedure with `global.elasticsearch.tls.existingSecret` or `global.opensearch.tls.existingSecret`. Both set `-Djavax.net.ssl.trustStore`, and the JVM uses only one truststore. If you need the CA from that Secret, import it into the new truststore in step 1 and remove the `existingSecret` value.

This procedure covers the Camunda Java components listed in step 3. It doesn't change the OS CA bundle or other components.

## 1. Build the truststore

Copy the truststore from the Zeebe image that runs in your cluster. Replace `X` in the image tag with your patch version. A truststore from another image can contain other CAs. List the common names (CNs) of the certificates to remove, one per line. The example lists two CAs:

```bash
CAMUNDA_IMAGE=camunda/zeebe:8.7.X
REMOVE_CNS='emSign ECC Root CA - G3
AAA Certificate Services'

docker run --rm --entrypoint sh -e REMOVE_CNS="$REMOVE_CNS" "$CAMUNDA_IMAGE" -c '
  certs="$(keytool -list -v -cacerts -storepass changeit)" || exit 1
  printf "%s\n" "$REMOVE_CNS" | while IFS= read -r cn; do
    printf "%s: " "$cn"
    printf "%s\n" "$certs" | awk -v cn="CN=${cn}," "/^Owner: / && index(\$0 \",\", cn) {count++} END {print count+0}"
  done'
```

Verify the count for each CA. A count of `1` or more means the image contains the CA. If every count is `0`, you don't need this procedure.

Then build the truststore without the listed CAs:

```bash
mkdir -p truststore
docker run --rm --user 0 --entrypoint sh \
  -v "$PWD/truststore:/out" -e REMOVE_CNS="$REMOVE_CNS" \
  "$CAMUNDA_IMAGE" -c '
    set -e
    keytool -importkeystore -noprompt \
      -srckeystore "$JAVA_HOME/lib/security/cacerts" -srcstorepass changeit \
      -destkeystore /out/cacerts -deststoretype PKCS12 -deststorepass changeit
    printf "%s\n" "$REMOVE_CNS" | while IFS= read -r cn; do
      certs="$(keytool -list -v -keystore /out/cacerts -storepass changeit)"
      printf "%s\n" "$certs" \
        | awk -v cn="CN=${cn}," "/^Alias name: /{alias=substr(\$0, 13)} /^Owner: / && index(\$0 \",\", cn) {print alias}" \
        | while IFS= read -r alias; do
            keytool -delete -alias "$alias" -keystore /out/cacerts -storepass changeit
          done
    done
    chmod 644 /out/cacerts'
```

Verify the truststore. The command must return `0` for every listed CA:

```bash
docker run --rm --entrypoint sh \
  -v "$PWD/truststore:/in:ro" -e REMOVE_CNS="$REMOVE_CNS" \
  "$CAMUNDA_IMAGE" -c '
    certs="$(keytool -list -v -keystore /in/cacerts -storepass changeit)" || exit 1
    printf "%s\n" "$REMOVE_CNS" | while IFS= read -r cn; do
      printf "%s: " "$cn"
      printf "%s\n" "$certs" | awk -v cn="CN=${cn}," "/^Owner: / && index(\$0 \",\", cn) {count++} END {print count+0}"
    done'
```

(Optional) Import your private CA:

```bash
docker run --rm --user 0 --entrypoint sh \
  -v "$PWD/truststore:/out" -v "$PWD/your-private-ca.pem:/ca.pem:ro" \
  "$CAMUNDA_IMAGE" -c 'keytool -importcert -noprompt -alias your-private-ca \
    -file /ca.pem -keystore /out/cacerts -storepass changeit'
```

The truststore contains public certificates only, so the default `changeit` password is not a secret.

## 2. Create the truststore Secret

```bash
kubectl -n "$NAMESPACE" create secret generic camunda-jvm-truststore \
  --from-file=cacerts=./truststore/cacerts --save-config
```

Create the Secret before you run `helm upgrade` in step 3. If the Secret doesn't exist, the pods stay in `ContainerCreating`.

## 3. Point the Java components to the truststore

Mount the Secret on each Java component and set the truststore flags:

| Component            | Values key           | Where to set the flags                                        |
| -------------------- | -------------------- | ------------------------------------------------------------- |
| Zeebe                | `zeebe`              | `javaOpts`. Keep the chart's default options.                 |
| Zeebe Gateway        | `zeebeGateway`       | `javaOpts`. Keep the chart's default options.                 |
| Operate              | `operate`            | `javaOpts`                                                    |
| Tasklist             | `tasklist`           | `javaOpts`                                                    |
| Optimize             | `optimize`           | `javaOpts`                                                    |
| Connectors           | `connectors`         | `JAVA_TOOL_OPTIONS` in `env`                                  |
| Identity             | `identity`           | `JAVA_TOOL_OPTIONS` in `env`                                  |
| Web Modeler REST API | `webModeler.restapi` | `JAVA_TOOL_OPTIONS` in `env`. `javaOpts` sets `JAVA_OPTIONS`. |

```yaml
zeebe:
  javaOpts: >-
    -XX:+HeapDumpOnOutOfMemoryError
    -XX:HeapDumpPath=/usr/local/zeebe/data
    -XX:ErrorFile=/usr/local/zeebe/data/zeebe_error%p.log
    -XX:+ExitOnOutOfMemoryError
    -Djavax.net.ssl.trustStore=/etc/camunda/jvm-truststore/cacerts
    -Djavax.net.ssl.trustStorePassword=changeit
  extraVolumes: &jvmTruststoreVolumes
    - name: jvm-truststore
      secret:
        secretName: camunda-jvm-truststore
  extraVolumeMounts: &jvmTruststoreMounts
    - name: jvm-truststore
      mountPath: /etc/camunda/jvm-truststore
      readOnly: true
zeebeGateway:
  javaOpts: >-
    -XX:+ExitOnOutOfMemoryError
    -Djavax.net.ssl.trustStore=/etc/camunda/jvm-truststore/cacerts
    -Djavax.net.ssl.trustStorePassword=changeit
  extraVolumes: *jvmTruststoreVolumes
  extraVolumeMounts: *jvmTruststoreMounts
operate:
  javaOpts: &jvmTruststoreOpts >-
    -Djavax.net.ssl.trustStore=/etc/camunda/jvm-truststore/cacerts
    -Djavax.net.ssl.trustStorePassword=changeit
  extraVolumes: *jvmTruststoreVolumes
  extraVolumeMounts: *jvmTruststoreMounts
tasklist:
  javaOpts: *jvmTruststoreOpts
  extraVolumes: *jvmTruststoreVolumes
  extraVolumeMounts: *jvmTruststoreMounts
optimize:
  javaOpts: *jvmTruststoreOpts
  extraVolumes: *jvmTruststoreVolumes
  extraVolumeMounts: *jvmTruststoreMounts
connectors:
  env: &jvmTruststoreEnv
    - name: JAVA_TOOL_OPTIONS
      value: >-
        -Djavax.net.ssl.trustStore=/etc/camunda/jvm-truststore/cacerts
        -Djavax.net.ssl.trustStorePassword=changeit
  extraVolumes: *jvmTruststoreVolumes
  extraVolumeMounts: *jvmTruststoreMounts
identity:
  env: *jvmTruststoreEnv
  extraVolumes: *jvmTruststoreVolumes
  extraVolumeMounts: *jvmTruststoreMounts
webModeler:
  restapi:
    env: *jvmTruststoreEnv
    extraVolumes: *jvmTruststoreVolumes
    extraVolumeMounts: *jvmTruststoreMounts
```

If you have already set `javaOpts` or `env` for a component, merge these entries into your values. Run `helm upgrade` with the file.

## 4. Verify the truststore

Make sure each Java process uses the new truststore. Each Java pod must return a `Picked up JAVA_TOOL_OPTIONS` line with `/etc/camunda/jvm-truststore/cacerts`:

```bash
for pod in $(kubectl -n "$NAMESPACE" get pods -o name -l app.kubernetes.io/part-of=camunda-platform); do
  echo "$pod: $(kubectl -n "$NAMESPACE" logs "$pod" --all-containers | grep -m1 'Picked up JAVA_TOOL_OPTIONS')"
done
```

The loop selects pods by the `app.kubernetes.io/part-of=camunda-platform` label. The output must show the flag for each Java component from step 3. Pods that don't run Java, such as Console and the Web Modeler `webapp` and `websockets`, print an empty value. Run the loop after `kubectl rollout status` finishes for each workload. Pods that are shutting down also print an empty value.

To update the truststore, rebuild it by following step 1. Then replace the Secret and restart the pods:

```bash
kubectl -n "$NAMESPACE" create secret generic camunda-jvm-truststore \
  --from-file=cacerts=./truststore/cacerts \
  --dry-run=client -o yaml | kubectl -n "$NAMESPACE" apply -f -
kubectl -n "$NAMESPACE" rollout restart statefulset,deployment \
  -l app.kubernetes.io/part-of=camunda-platform
```
