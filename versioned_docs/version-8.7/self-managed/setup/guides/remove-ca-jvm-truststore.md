---
id: remove-ca-jvm-truststore
title: "Remove a CA from the JVM truststore"
description: "Replace the JVM truststore of the Camunda Java components with a copy that doesn't contain a CA."
---

To stop the Camunda Java components from trusting a CA that is in the image's default truststore, replace the truststore. The Helm chart has no option to remove a CA from the image truststore.

The procedure builds a copy of the image truststore without the CA and stores the copy in a Secret. Then it points each Java component to the copy with `-Djavax.net.ssl.trustStore`. Use it as an interim measure until you upgrade to images that no longer contain the CA.

Don't combine this procedure with `global.elasticsearch.tls.existingSecret` or `global.opensearch.tls.existingSecret`. Both set `-Djavax.net.ssl.trustStore`, and the JVM uses only one truststore. If you need the CA from that Secret, import it into the new truststore in step 1 and remove the `existingSecret` value.

This procedure covers the Camunda Java components in step 3. It doesn't change the OS CA bundle or other components.

## 1. Build the truststore

Copy the truststore from the Zeebe image that runs in your cluster. Replace `X` in the image tag with your patch version. A truststore from another image can contain other CAs. Then remove each certificate whose subject starts with the common name (CN) that you set. The example removes `emSign ECC Root CA - G3`:

```bash
CAMUNDA_IMAGE=camunda/zeebe:8.7.X
REMOVE_CN='emSign ECC Root CA - G3'

mkdir -p truststore
docker run --rm --user 0 --entrypoint sh \
  -v "$PWD/truststore:/out" -e REMOVE_CN="$REMOVE_CN" \
  "$CAMUNDA_IMAGE" -c '
    keytool -importkeystore -noprompt \
      -srckeystore "$JAVA_HOME/lib/security/cacerts" -srcstorepass changeit \
      -destkeystore /out/cacerts -deststoretype PKCS12 -deststorepass changeit
    keytool -list -v -keystore /out/cacerts -storepass changeit \
      | awk -v cn="CN=${REMOVE_CN}," "/^Alias name: /{alias=substr(\$0, 13)} /^Owner: / && index(\$0 \",\", cn) {print alias}" \
      | while IFS= read -r alias; do
          keytool -delete -alias "$alias" -keystore /out/cacerts -storepass changeit
        done
    chmod 644 /out/cacerts'
```

Make sure the CA is gone. The command must print `0`:

```bash
docker run --rm --entrypoint sh \
  -v "$PWD/truststore:/in:ro" -e REMOVE_CN="$REMOVE_CN" \
  "$CAMUNDA_IMAGE" -c 'keytool -list -v -keystore /in/cacerts -storepass changeit \
    | grep -c "^Owner: CN=${REMOVE_CN},"'
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
  --from-file=cacerts=./truststore/cacerts
```

Create the Secret before you run `helm upgrade` in step 3. If the Secret doesn't exist, the pods stay in `ContainerCreating`.

## 3. Point the Java components to the truststore

Mount the Secret on each Java component and set the truststore flags:

| Component            | Values key           | Where to set the flags                                        |
| -------------------- | -------------------- | ------------------------------------------------------------- |
| Zeebe                | `zeebe`              | `javaOpts`. Keep the chart default options.                   |
| Zeebe Gateway        | `zeebeGateway`       | `javaOpts`. Keep the chart default options.                   |
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

If you already set `javaOpts` or `env` for a component, merge these entries into your values. Run `helm upgrade` with the file.

## 4. Verify the truststore

Make sure each Java process uses the new truststore. Each Java pod must print a `Picked up JAVA_TOOL_OPTIONS` line with `/etc/camunda/jvm-truststore/cacerts`:

```bash
for pod in $(kubectl -n "$NAMESPACE" get pods -o name -l app.kubernetes.io/part-of=camunda-platform); do
  echo "$pod: $(kubectl -n "$NAMESPACE" logs "$pod" --all-containers | grep -m1 'Picked up JAVA_TOOL_OPTIONS')"
done
```

The loop selects pods by the `app.kubernetes.io/part-of=camunda-platform` label. Make sure each Java component from step 3 is in the output. If the value after a pod name is empty, that pod doesn't use the new truststore.

To update the truststore, build it again and replace the Secret. Then restart the pods:

```bash
kubectl -n "$NAMESPACE" rollout restart statefulset,deployment \
  -l app.kubernetes.io/part-of=camunda-platform
```
