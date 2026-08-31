---
id: orchestration-tls-modes
sidebar_label: Orchestration TLS modes
title: Configure Orchestration REST and gRPC TLS modes
description: Enable REST TLS and gRPC TLS independently on the Orchestration component with first-class Helm values.
---

Orchestration exposes a REST API (`SERVER_SSL_ENABLED`) and a gRPC API (`CAMUNDA_API_GRPC_SSL_ENABLED`) as independent server settings. The Camunda 8 Helm chart provides a first-class values surface that configures both server flags, the public NGINX Ingress backend protocol, and the in-cluster client schemes used by Web Modeler and Connectors. Customers no longer need to duplicate `webModeler.restapi.clusters` or `connectors.configuration` blocks just to enable Orchestration TLS.

:::caution Trust bundle is required for self-signed and private-PKI certificates

The settings on this page configure the Orchestration **server** and the **NGINX Ingress** legs. They do **not** by themselves teach in-cluster Java clients (Web Modeler, Connectors) to trust the cert. If the Orchestration server certificate is self-signed or issued by a private/internal CA, you **must also** set `global.tls.caBundle.secret.existingSecret` to a Secret holding the CA bundle that signed it. Without it, the JVM default truststore is used and gRPC/REST handshakes from Web Modeler and Connectors will fail with `PKIX path building failed`. The minimal caBundle configuration is shown in the [cert-manager recipe](#recipe-cert-manager--lets-encrypt-or-internal-issuer) below.

Certificates issued by a public CA already present in the JVM truststore (Let's Encrypt, DigiCert, etc.) do not require this.

:::

## First-class values

```yaml
global:
  tls:
    orchestration:
      autoRollout: false # opt-in: roll Orchestration pods on Secret rotation (requires Secret read RBAC)
      rest:
        enabled: false # REST TLS — sets SERVER_SSL_ENABLED on Orchestration
        type: pkcs12 # one of: pkcs12, pem
        keyAlias: "" # pkcs12 only — optional cert alias inside the keystore
        cert:
          secret:
            existingSecret: "" # Kubernetes Secret holding the REST server cert (or PKCS12 keystore)
            existingSecretKey: "" # pkcs12: keystore file key (default keystore.p12); pem: cert key (default tls.crt)
        privateKey:
          secret:
            existingSecretKey: tls.key # pem only — private-key key inside the Secret
        keystorePassword:
          secret:
            existingSecretKey: keystore-password # pkcs12 only — keystore password key inside the Secret
        proxyVerify:
          enabled: false
          caSecret:
            secret:
              existingSecret: "" # Secret holding the CA bundle for NGINX upstream verification
              existingSecretKey: ca.crt
            namespace: "" # optional: CA Secret namespace (defaults to release namespace)
      grpc:
        enabled: false # gRPC TLS — sets CAMUNDA_API_GRPC_SSL_ENABLED on Orchestration
        cert:
          secret:
            existingSecret: "" # Kubernetes Secret with PEM cert for the gRPC server
            existingSecretKey: "" # defaults to tls.crt
        privateKey:
          secret:
            existingSecretKey: tls.key
```

Both flags default to `false`. Set either independently to enable that protocol's TLS. Explicit `orchestration.env` entries with the same name override these flags (Kubernetes last-wins on duplicate env names).

When `enabled: true`, the chart fails template rendering unless the cert material is configured either via the `secret` sub-block (recommended) or via explicit env vars (`SERVER_SSL_KEY_STORE` / `SERVER_SSL_CERTIFICATE` for REST, `CAMUNDA_API_GRPC_SSL_CERTIFICATE` for gRPC). This prevents the silent Spring Boot / gRPC startup crash that would otherwise occur.

### REST TLS: PKCS12 vs PEM

The REST `type` field selects which Spring Boot SSL property family the chart emits:

- **`pkcs12` (default)** — emits `SERVER_SSL_KEY_STORE`, `SERVER_SSL_KEY_STORE_TYPE=PKCS12`, `SERVER_SSL_KEY_STORE_PASSWORD` (via `secretKeyRef`), and optionally `SERVER_SSL_KEY_ALIAS`.
- **`pem`** — emits `SERVER_SSL_CERTIFICATE` and `SERVER_SSL_CERTIFICATE_PRIVATE_KEY` (Spring Boot 2.7+). Use this for cert-manager `kubernetes.io/tls` Secrets (`tls.crt` + `tls.key`) and Let's Encrypt-issued certificates — no manual PKCS12 conversion needed.

The gRPC server only accepts PEM, so the gRPC `secret` block has no `type` field.

### Cert rotation

`global.tls.orchestration.autoRollout` mirrors `global.tls.caBundle.autoRollout`. When `true`, the chart stamps `checksum/orchestration-tls-{rest,grpc}` pod annotations derived from the configured Secret. For PEM REST and gRPC certificates, the hash covers both the certificate and private key. For PKCS12, it covers the keystore. A `helm upgrade` then rolls the Orchestration pods when this material changes.

The hash deliberately excludes the keystore password. Rotate the password with the keystore material or restart the StatefulSet manually after a password-only change.

This uses Helm's `lookup`, which requires the upgrading identity to have `get` on Secrets in the release namespace. It is inert under GitOps tools that render with `helm template`. Leave `autoRollout` off in those environments and rotate manually with `kubectl rollout restart statefulset/<release>-orchestration`.

### Recipe: cert-manager + Let's Encrypt or internal Issuer

cert-manager produces `kubernetes.io/tls` Secrets with `tls.crt` + `tls.key`. The chart consumes those directly — PEM for REST (via `type: pem`) and PEM for gRPC.

This recipe assumes cert-manager v1.x is already installed in the cluster. If it is not, install it first per the [cert-manager installation guide](https://cert-manager.io/docs/installation/) (typically `helm install cert-manager jetstack/cert-manager --set crds.enabled=true`).

The four-step example below creates and uses an internal CA. For a public ACME provider such as Let's Encrypt, don't apply steps one through three. In the server `Certificate` from step four, replace `issuerRef.name` and `issuerRef.kind` with the name and kind of your existing ACME `Issuer` or `ClusterIssuer`. Public CA certificates already present in the JVM default truststore don't need `global.tls.caBundle`.

```yaml
# 1. Bootstrap Issuer. A bare selfSigned Issuer cannot issue a CA bundle on
#    its own — it only signs each Certificate with that Certificate's own
#    private key. It exists solely to sign step 2 (the actual CA Certificate).
apiVersion: cert-manager.io/v1
kind: Issuer
metadata:
  name: camunda-selfsigned-bootstrap
  namespace: camunda
spec:
  selfSigned: {}
---
# 2. The actual CA Certificate. isCA: true makes this a CA cert whose
#    private key signs subsequent leaf certs. The resulting Secret
#    (camunda-ca-bundle) is what global.tls.caBundle.secret.existingSecret
#    points at — Web Modeler and Connectors load it into the JVM truststore.
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: camunda-ca
  namespace: camunda
spec:
  isCA: true
  commonName: camunda-ca
  secretName: camunda-ca-bundle
  duration: 87600h # 10 years — pick a CA lifetime longer than any leaf
  privateKey:
    algorithm: ECDSA
    size: 256
  issuerRef:
    name: camunda-selfsigned-bootstrap
    kind: Issuer
---
# 3. The CA Issuer. Uses the CA cert+key from step 2 to sign leaf
#    Certificates. This is the Issuer your server Certificates reference.
apiVersion: cert-manager.io/v1
kind: Issuer
metadata:
  name: camunda-ca-issuer
  namespace: camunda
spec:
  ca:
    secretName: camunda-ca-bundle
---
# 4. Server Certificate (gRPC shown; REST is identical with its own
#    secretName + dnsNames matching the REST service).
#
# IMPORTANT: dnsNames must match the actual Kubernetes Service name
# that fronts the Orchestration gRPC port (26500). Confirm with:
#   kubectl -n camunda get svc -l app.kubernetes.io/component=zeebe-gateway
# The Service name derives from orchestration.serviceName; in the chart 8.10
# default layout it is typically `<release>-zeebe-gateway` (the
# zeebe-gateway component label is kept for backward compatibility through
# the Orchestration rebrand). Always confirm the actual name with the
# command above rather than assuming it.
# Substitute your actual release name for `my-release` below.
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: orchestration-grpc-cert
  namespace: camunda
spec:
  secretName: orchestration-grpc-cert # → matches existingSecret in values
  duration: 8760h
  renewBefore: 720h
  issuerRef:
    name: camunda-ca-issuer # step 3, NOT the bootstrap
    kind: Issuer
  dnsNames:
    - my-release-zeebe-gateway
    - my-release-zeebe-gateway.camunda.svc
    - my-release-zeebe-gateway.camunda.svc.cluster.local
```

Then in the chart values:

```yaml
global:
  tls:
    orchestration:
      autoRollout: true # cert-manager renews on schedule; this rolls Orchestration on renewal
      rest:
        enabled: true
        type: pem
        cert:
          secret:
            existingSecret: orchestration-rest-cert # a step-4 Certificate for the REST service
            # existingSecretKey defaults to tls.crt when type=pem (auto-substituted)
        # privateKey.secret.existingSecretKey defaults to tls.key
      grpc:
        enabled: true
        cert:
          secret:
            existingSecret: orchestration-grpc-cert
            # existingSecretKey defaults to tls.crt
        # privateKey.secret.existingSecretKey defaults to tls.key
    caBundle:
      secret:
        # The CA cert Secret from step 2 above. Web Modeler and Connectors
        # load this into the JVM truststore so their handshakes to the
        # Orchestration REST and gRPC servers succeed. Skip this whole
        # block if your server certs are from a public CA already in the
        # JVM default truststore (Let's Encrypt, DigiCert, etc.).
        existingSecret: camunda-ca-bundle
        existingSecretKey: ca.crt
      autoRollout: true
```

### Migrating from a hand-wired Orchestration TLS setup

Before this guide existed, customers enabled Orchestration TLS by hand-wiring everything in `orchestration.env` plus `extraVolumes`/`extraVolumeMounts`. The legacy shape still works (the helpers OR-merge the new flag with the env vars), so an upgrade is non-breaking by default. To migrate to the first-class surface:

**Before** (legacy):

```yaml
orchestration:
  env:
    - name: CAMUNDA_API_GRPC_SSL_ENABLED
      value: "true"
    - name: CAMUNDA_API_GRPC_SSL_CERTIFICATE
      value: /usr/local/camunda/certificates/orchestration/tls.crt
    - name: CAMUNDA_API_GRPC_SSL_CERTIFICATEPRIVATEKEY
      value: /usr/local/camunda/certificates/orchestration/tls.key
  extraVolumes:
    - name: orchestration-tls
      secret:
        secretName: orchestration-grpc-cert
  extraVolumeMounts:
    - name: orchestration-tls
      mountPath: /usr/local/camunda/certificates/orchestration
      readOnly: true
```

**After** (first-class):

```yaml
global:
  tls:
    orchestration:
      grpc:
        enabled: true
        cert:
          secret:
            existingSecret: orchestration-grpc-cert
```

The `helm upgrade` will roll the Orchestration StatefulSet because the rendered env vars and volume names change. Expect a brief outage during the rolling restart (no data loss — PVCs are unchanged). Existing hand-written `webModeler.restapi.clusters` or `connectors.configuration` blocks remain authoritative; if their `grpc-address` / `rest-address` matches what the chart would derive (visible via `helm template`), you can delete them too.

### Verify the REST backend certificate at the Ingress (NGINX)

By default, NGINX Ingress uses TLS for the REST upstream when `backend-protocol: HTTPS` is set, but it doesn't verify the upstream certificate. Enable `proxyVerify` under `global.tls.orchestration.rest` to verify the REST certificate. The chart doesn't support `proxyVerify` for gRPC because the Ingress-NGINX controller applies its `proxy-ssl-*` annotations to `proxy_pass`, not the `grpc_pass` used by a GRPCS backend.

```yaml
global:
  tls:
    orchestration:
      rest:
        enabled: true
        type: pem
        cert:
          secret:
            existingSecret: orchestration-rest-cert
            existingSecretKey: tls.crt
        privateKey:
          secret:
            existingSecretKey: tls.key
        proxyVerify:
          enabled: true
          caSecret:
            secret:
              existingSecret: orchestration-upstream-ca # PEM CA bundle
              existingSecretKey: ca.crt
          sniHost: "" # set when the cert SAN does not match the in-cluster service name
```

This adds the following annotations to the `/orchestration` Ingress:

- `nginx.ingress.kubernetes.io/proxy-ssl-verify: on`
- `nginx.ingress.kubernetes.io/proxy-ssl-secret: <namespace>/<caSecret.secret.existingSecret>`
- `nginx.ingress.kubernetes.io/proxy-ssl-name: <sniHost>` and `proxy-ssl-server-name: on` (only when `sniHost` is set)

The CA Secret must contain the CA bundle under the fixed `ca.crt` key. By default, the chart expects the Secret in the same namespace as the Ingress resource. To reference a Secret in a different namespace, set `caSecret.namespace` and configure the Ingress-NGINX controller with `allow-cross-namespace-resources=true`. The chart fails template rendering if `proxyVerify.enabled: true` and `caSecret.secret.existingSecret` is empty.

Note that `proxyVerify` covers only the NGINX → Orchestration leg. In-cluster Java clients (Web Modeler, Connectors) trust upstream certs through `global.tls.caBundle`, which is independent.

## Supported modes

| Mode                | `global.tls.orchestration.rest.enabled` | `global.tls.orchestration.grpc.enabled` | `/orchestration` Ingress backend | gRPC Ingress backend-protocol | Web Modeler gRPC | Connectors gRPC | REST clients |
| ------------------- | --------------------------------------- | --------------------------------------- | -------------------------------- | ----------------------------- | ---------------- | --------------- | ------------ |
| Plaintext (default) | `false`                                 | `false`                                 | HTTP                             | `GRPC`                        | `grpc://`        | `http://`       | `http://`    |
| REST TLS only       | `true`                                  | `false`                                 | HTTPS                            | `GRPC`                        | `grpc://`        | `http://`       | `https://`   |
| gRPC TLS only       | `false`                                 | `true`                                  | HTTP                             | `GRPCS`                       | `grpcs://`       | `https://`      | `http://`    |
| Both TLS            | `true`                                  | `true`                                  | HTTPS                            | `GRPCS`                       | `grpcs://`       | `https://`      | `https://`   |

The chart derives Web Modeler and Connectors endpoints automatically. Explicit `webModeler.restapi.clusters` and `connectors.configuration` blocks remain authoritative — set them only if you need an endpoint shape the helpers do not produce.

## Example: REST plaintext + gRPC TLS

This is the SUPPORT-33090 customer shape: an internal Zero-Trust network where the gRPC API must be TLS-protected but the REST API stays on plaintext behind the cluster Ingress.

```yaml
global:
  host: camunda.example.com
  ingress:
    enabled: true
    tls:
      enabled: true
      secretName: camunda-platform-tls
  tls:
    orchestration:
      grpc:
        enabled: true
        cert:
          secret:
            existingSecret: orchestration-grpc-cert
            existingSecretKey: tls.crt
        privateKey:
          secret:
            existingSecretKey: tls.key
    caBundle:
      secret:
        existingSecret: camunda-internal-ca
        existingSecretKey: ca.crt
```

The chart mounts `orchestration-grpc-cert` into the Orchestration pod and sets `CAMUNDA_API_GRPC_SSL_CERTIFICATE` / `CAMUNDA_API_GRPC_SSL_CERTIFICATEPRIVATEKEY` to the mounted paths automatically. Create the secret out-of-band, for example:

```shell
kubectl create secret generic orchestration-grpc-cert \
  --from-file=tls.crt=./tls.crt \
  --from-file=tls.key=./tls.key
```

With this configuration the chart:

- Sets `CAMUNDA_API_GRPC_SSL_ENABLED=true` on the Orchestration container.
- Annotates the public gRPC Ingress with `nginx.ingress.kubernetes.io/backend-protocol: GRPCS`.
- Renders the Web Modeler REST API ConfigMap with `grpc: grpcs://<orchestration-grpc-service>:26500`.
- Renders the Connectors ConfigMap with `grpc-address: https://<orchestration-grpc-service>:26500`.

Trust material for in-cluster Java components flows through [`global.tls.caBundle`](#recipe-cert-manager--lets-encrypt-or-internal-issuer). The CA bundle is mounted as a Java truststore into Orchestration, Web Modeler, Connectors, and any other Java components in the release.

## Verification

After deploying, confirm the in-cluster endpoints match the chosen mode:

```shell
kubectl -n <namespace> get ingress <release>-grpc \
  -o jsonpath='{.metadata.annotations.nginx\.ingress\.kubernetes\.io/backend-protocol}{"\n"}'

kubectl -n <namespace> get configmap <release>-connectors-configuration \
  -o jsonpath='{.data.application\.yaml}' | grep -E 'grpc-address|rest-address'

kubectl -n <namespace> get configmap <release>-web-modeler-restapi-configuration \
  -o jsonpath='{.data.application\.yaml}' | grep -E '^\s+(grpc|rest):'
```

## Connectors TLS

Connectors in 8.10 runs its own Spring Boot HTTP server. The chart can expose it through an NGINX Ingress or a Gateway API `HTTPRoute`. `global.tls.connectors` mirrors the Orchestration REST configuration and enables TLS at the Connectors pod.

### Modes

- **PKCS12 (default)** — `type: pkcs12`. The chart sets `SERVER_SSL_KEY_STORE`, `SERVER_SSL_KEY_STORE_TYPE=PKCS12`, and `SERVER_SSL_KEY_STORE_PASSWORD` (from a `secretKeyRef`) on the Connectors container. Use when you manage keystores out-of-band (Java PKI, internal CA).
- **PEM (cert-manager compatible)** — `type: pem`. The chart sets `SERVER_SSL_CERTIFICATE` and `SERVER_SSL_CERTIFICATE_PRIVATE_KEY` on the Connectors container. Compatible with cert-manager `kubernetes.io/tls` Secrets out of the box.

In both modes the chart:

- Sets `SERVER_SSL_ENABLED=true` on the Connectors container.
- Mounts the referenced Secret at `/usr/local/camunda/certificates/connectors/`.
- Switches the container probes (`startupProbe` / `readinessProbe` / `livenessProbe`) to `HTTPS`.
- Stamps a `checksum/connectors-tls` pod annotation when `global.tls.connectors.autoRollout: true`, so the next `helm upgrade` rolls Connectors on cert rotation.

### PKCS12 example

```yaml
global:
  tls:
    connectors:
      enabled: true
      type: pkcs12
      keyAlias: connectors-rest
      cert:
        secret:
          existingSecret: connectors-tls-keystore
          existingSecretKey: keystore.p12
      keystorePassword:
        secret:
          existingSecretKey: keystore-password
    caBundle:
      secret:
        existingSecret: camunda-internal-ca
        existingSecretKey: ca.crt
```

Create the Secret out-of-band:

```shell
openssl pkcs12 -export \
  -in ./tls.crt -inkey ./tls.key \
  -out ./keystore.p12 \
  -password pass:changeit \
  -name connectors-rest

kubectl create secret generic connectors-tls-keystore \
  --from-file=keystore.p12=./keystore.p12 \
  --from-literal=keystore-password=changeit
```

### PEM example (cert-manager)

```yaml
global:
  tls:
    connectors:
      enabled: true
      type: pem
      cert:
        secret:
          existingSecret: connectors-cert
          # existingSecretKey defaults to tls.crt when type=pem (auto-substituted)
    caBundle:
      secret:
        existingSecret: camunda-internal-ca
        existingSecretKey: ca.crt
```

With a cert-manager `Certificate` that issues into the same namespace, the resulting `kubernetes.io/tls` Secret already carries `tls.crt` and `tls.key` — the chart picks them up automatically (when `cert.secret.existingSecretKey` is left empty in PEM mode, `tls.crt` is substituted automatically).

### Configure inbound routing

The dedicated NGINX Ingress template sets its backend protocol to HTTPS when Connectors TLS is enabled. The Gateway API `HTTPRoute` still forwards plaintext unless a `BackendTLSPolicy` targets the Connectors Service. Create that policy according to your Gateway implementation and configure its certificate validation before enabling pod TLS. Without the policy, inbound Connectors traffic through the generated `HTTPRoute` fails.

### Verification

```shell
kubectl -n <namespace> get deployment <release>-connectors \
  -o jsonpath='{.spec.template.spec.containers[0].env}' | jq '.[] | select(.name|startswith("SERVER_SSL_"))'

kubectl -n <namespace> get deployment <release>-connectors \
  -o jsonpath='{.spec.template.spec.containers[0].readinessProbe.httpGet.scheme}{"\n"}'
```

## Optimize TLS

Optimize in 8.10 runs its own Spring Boot HTTP server. The chart can expose it through an NGINX Ingress or a Gateway API `HTTPRoute`. `global.tls.optimize` mirrors the Orchestration REST configuration and enables TLS at the Optimize pod.

This server-side TLS is independent of the existing client-side `optimize.database.elasticsearch.tls` / `optimize.database.opensearch.tls` configuration. The legacy `global.elasticsearch.tls.secret.existingSecret` and `global.opensearch.tls.secret.existingSecret` paths also configure the client truststore. Both directions can use TLS together. The chart mounts the server certificate from a regular Secret volume named `optimize-server-tls`, alongside the client-side `keystore` truststore mount.

### Modes

- **PKCS12 (default)** — `type: pkcs12`. The chart sets `SERVER_SSL_KEY_STORE`, `SERVER_SSL_KEY_STORE_TYPE=PKCS12`, and `SERVER_SSL_KEY_STORE_PASSWORD` (from a `secretKeyRef`) on the Optimize main container. Use when you manage keystores out-of-band (Java PKI, internal CA).
- **PEM (cert-manager compatible)** — `type: pem`. The chart sets `SERVER_SSL_CERTIFICATE` and `SERVER_SSL_CERTIFICATE_PRIVATE_KEY` on the Optimize main container. Compatible with cert-manager `kubernetes.io/tls` Secrets out of the box.

In both modes the chart:

- Sets `SERVER_SSL_ENABLED=true` on the Optimize main container (and only the main container — the optional `migration` init container is untouched, since it does not serve HTTP).
- Mounts the referenced Secret at `/usr/local/camunda/certificates/optimize/` as a regular Secret volume named `optimize-server-tls`.
- Uses HTTPS for `startupProbe`, `readinessProbe`, and `livenessProbe` when their `scheme` values are empty, which is the default. An explicit scheme remains authoritative, including `HTTP`.
- Stamps a `checksum/optimize-tls` pod annotation when `global.tls.optimize.autoRollout: true`, so the next `helm upgrade` rolls Optimize on cert rotation.

### Server-side vs client-side TLS in Optimize

The two surfaces are deliberately orthogonal:

| Direction                     | Values key                                                                                  | Volume name           | Purpose                                                                               |
| ----------------------------- | ------------------------------------------------------------------------------------------- | --------------------- | ------------------------------------------------------------------------------------- |
| Inbound (clients → Optimize)  | `global.tls.optimize.cert.secret.existingSecret`                                            | `optimize-server-tls` | Server identity cert + key for the Optimize HTTP listener (this guide).               |
| Outbound (Optimize → ES / OS) | `optimize.database.elasticsearch.tls.secret.existingSecret` (or `…opensearch.tls.secret.…`) | `keystore`            | Truststore so Optimize trusts the ES / OS server cert when calling secondary storage. |

Operators commonly need both at once (mTLS-style hardening across the whole data plane). The chart supports both simultaneously; the regression test suite asserts that the `optimize-server-tls` and `keystore` volumes coexist with their respective mounts on the Optimize main container.

### PKCS12 example

```yaml
global:
  tls:
    optimize:
      enabled: true
      type: pkcs12
      keyAlias: optimize-rest
      cert:
        secret:
          existingSecret: optimize-tls-keystore
          existingSecretKey: keystore.p12
      keystorePassword:
        secret:
          existingSecretKey: keystore-password
    caBundle:
      secret:
        existingSecret: camunda-internal-ca
        existingSecretKey: ca.crt
```

Create the Secret out-of-band:

```shell
openssl pkcs12 -export \
  -in ./tls.crt -inkey ./tls.key \
  -out ./keystore.p12 \
  -password pass:changeit \
  -name optimize-rest

kubectl create secret generic optimize-tls-keystore \
  --from-file=keystore.p12=./keystore.p12 \
  --from-literal=keystore-password=changeit
```

### PEM example (cert-manager)

```yaml
global:
  tls:
    optimize:
      enabled: true
      type: pem
      cert:
        secret:
          existingSecret: optimize-cert
          # existingSecretKey defaults to tls.crt when type=pem (auto-substituted)
    caBundle:
      secret:
        existingSecret: camunda-internal-ca
        existingSecretKey: ca.crt
```

With a cert-manager `Certificate` that issues into the same namespace, the resulting `kubernetes.io/tls` Secret already carries `tls.crt` and `tls.key` — the chart picks them up automatically (when `cert.secret.existingSecretKey` is left empty in PEM mode, `tls.crt` is substituted automatically).

### Combined server + client TLS example

```yaml
global:
  tls:
    optimize:
      enabled: true
      cert:
        secret:
          existingSecret: optimize-tls-keystore
    caBundle:
      secret:
        existingSecret: camunda-internal-ca
        existingSecretKey: ca.crt
optimize:
  enabled: true
  database:
    elasticsearch:
      tls:
        enabled: true
        secret:
          existingSecret: elasticsearch-ca
          existingSecretKey: ca.crt
```

The chart wires the inbound `optimize-server-tls` keystore for the Optimize HTTP listener AND the outbound `keystore` truststore that Optimize uses when calling Elasticsearch over HTTPS. Both paths are independent and may be enabled together.

### Configure inbound routing

The dedicated NGINX Ingress template sets its backend protocol to HTTPS when Optimize TLS is enabled. The Gateway API `HTTPRoute` still forwards plaintext unless a `BackendTLSPolicy` targets the Optimize Service. Create that policy according to your Gateway implementation and configure its certificate validation before enabling pod TLS. Without the policy, inbound Optimize traffic through the generated `HTTPRoute` fails.

### Verification

```shell
kubectl -n <namespace> get deployment <release>-optimize \
  -o jsonpath='{.spec.template.spec.containers[0].env}' | jq '.[] | select(.name|startswith("SERVER_SSL_"))'

kubectl -n <namespace> get deployment <release>-optimize \
  -o jsonpath='{.spec.template.spec.containers[0].readinessProbe.httpGet.scheme}{"\n"}'

kubectl -n <namespace> get deployment <release>-optimize \
  -o jsonpath='{range .spec.template.spec.volumes[*]}{.name}{"\n"}{end}' | grep -E 'optimize-server-tls|keystore'
```
