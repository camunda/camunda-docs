---
id: orchestration-tls-modes
sidebar_label: Orchestration TLS modes
title: Configure Orchestration REST and gRPC TLS modes
description: Enable REST TLS and gRPC TLS independently on the Orchestration component with first-class Helm values.
---

Orchestration exposes a REST API (`SERVER_SSL_ENABLED`) and a gRPC API (`CAMUNDA_API_GRPC_SSL_ENABLED`) as independent server settings. The Camunda 8 Helm chart provides a first-class values surface that configures both server flags, the public NGINX ingress backend protocol, and the in-cluster client schemes used by Web Modeler and Connectors. Customers no longer need to duplicate `webModeler.restapi.clusters` or `connectors.configuration` blocks just to enable Orchestration TLS.

:::caution Trust bundle is required for self-signed and private-PKI certificates

The settings on this page configure the Orchestration **server** and the **NGINX ingress** legs. They do **not** by themselves teach in-cluster Java clients (Web Modeler, Connectors) to trust the cert. If the Orchestration server certificate is self-signed or issued by a private/internal CA, you **must also** set [`global.tls.caBundle.secret.existingSecret`](./secret-management.md) to a Secret holding the trust bundle. Without it, the JVM default truststore is used and gRPC/REST handshakes will fail.

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
        secret:
          existingSecret: "" # Kubernetes secret holding the REST server cert material
          type: pkcs12 # one of: pkcs12, pem
          existingSecretKey: keystore.p12 # pkcs12: keystore file; pem: certificate file (e.g. tls.crt)
          existingSecretPrivateKeyKey: tls.key # pem only — private-key file
          existingSecretPasswordKey: keystore-password # pkcs12 only — keystore password key
          keyAlias: "" # pkcs12 only — optional cert alias inside the keystore
      grpc:
        enabled: false # gRPC TLS — sets CAMUNDA_API_GRPC_SSL_ENABLED on Orchestration
        secret:
          existingSecret: "" # Kubernetes secret with PEM cert + key for the gRPC server
          existingSecretKey: tls.crt
          existingSecretPrivateKeyKey: tls.key
```

Both flags default to `false`. Set either independently to enable that protocol's TLS. Explicit `orchestration.env` entries with the same name override these flags (Kubernetes last-wins on duplicate env names).

When `enabled: true`, the chart fails template rendering unless the cert material is configured either via the `secret` sub-block (recommended) or via explicit env vars (`SERVER_SSL_KEY_STORE` / `SERVER_SSL_CERTIFICATE` for REST, `CAMUNDA_API_GRPC_SSL_CERTIFICATE` for gRPC). This prevents the silent Spring Boot / gRPC startup crash that would otherwise occur.

### REST TLS: PKCS12 vs PEM

The REST `secret.type` field selects which Spring Boot SSL property family the chart emits:

- **`pkcs12` (default)** — emits `SERVER_SSL_KEY_STORE`, `SERVER_SSL_KEY_STORE_TYPE=PKCS12`, `SERVER_SSL_KEY_STORE_PASSWORD` (via `secretKeyRef`), and optionally `SERVER_SSL_KEY_ALIAS`.
- **`pem`** — emits `SERVER_SSL_CERTIFICATE` and `SERVER_SSL_CERTIFICATE_PRIVATE_KEY` (Spring Boot 2.7+). Use this for cert-manager `kubernetes.io/tls` Secrets (`tls.crt` + `tls.key`) and Let's Encrypt-issued certificates — no manual PKCS12 conversion needed.

The gRPC server only accepts PEM, so the gRPC `secret` block has no `type` field.

### Cert rotation

`global.tls.orchestration.autoRollout` mirrors `global.tls.caBundle.autoRollout`. When `true`, the chart stamps a `checksum/orchestration-tls-{rest,grpc}` pod annotation derived from **only the public cert content** of the configured Secret, so a `helm upgrade` rolls the Orchestration pods whenever the cert content changes. Hashing only the cert (not the keystore password or private key) means the annotation reveals nothing an attacker couldn't already learn from the TLS handshake — it cannot be replayed against candidate passwords. This uses Helm's `lookup`, which **requires the upgrading identity to have `get` on Secrets** in the release namespace and is **inert under GitOps tools that render with `helm template`**. Leave it off in those environments and rotate manually with `kubectl rollout restart statefulset/<release>-orchestration`.

One edge case: rotating **only the keystore password** without changing the cert content does not flip the hash, so autoRollout will not pick it up. In practice every modern rotation tool (cert-manager `Certificate` renewal, manual `openssl pkcs12 -export` cycles) writes a fresh keystore on each renewal, so the cert content changes too. For password-only rotation, use `kubectl rollout restart statefulset/<release>-orchestration`.

### Recipe: cert-manager + Let's Encrypt or internal Issuer

cert-manager produces `kubernetes.io/tls` Secrets with `tls.crt` + `tls.key`. The chart consumes those directly — PEM for REST (via `type: pem`) and PEM for gRPC.

```yaml
# 1. Issuer (or ClusterIssuer): in this example a self-signed in-cluster CA.
#    For a public CA, use the cert-manager ACME / Let's Encrypt Issuer instead.
apiVersion: cert-manager.io/v1
kind: Issuer
metadata:
  name: camunda-ca
  namespace: camunda
spec:
  selfSigned: {}
---
# 2. Certificate request. SAN must match the in-cluster service hostname.
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: orchestration-grpc-cert
  namespace: camunda
spec:
  secretName: orchestration-grpc-cert # → matches existingSecret below
  duration: 8760h
  renewBefore: 720h
  issuerRef:
    name: camunda-ca
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
        secret:
          existingSecret: orchestration-rest-cert # also a cert-manager Certificate
          type: pem
          # existingSecretKey defaults to tls.crt when type=pem (auto-substituted)
          # existingSecretPrivateKeyKey defaults to tls.key
      grpc:
        enabled: true
        secret:
          existingSecret: orchestration-grpc-cert
          # existingSecretKey defaults to tls.crt
          # existingSecretPrivateKeyKey defaults to tls.key
    caBundle:
      secret:
        # For an internal CA Issuer, expose the CA cert as a Secret and reference it
        # here so Web Modeler and Connectors trust it. Skip this if the cert is from
        # a public CA already in the JVM truststore.
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
        secret:
          existingSecret: orchestration-grpc-cert
```

The `helm upgrade` will roll the Orchestration StatefulSet because the rendered env vars and volume names change. Expect a brief outage during the rolling restart (no data loss — PVCs are unchanged). Existing hand-written `webModeler.restapi.clusters` or `connectors.configuration` blocks remain authoritative; if their `grpc-address` / `rest-address` matches what the chart would derive (visible via `helm template`), you can delete them too.

### Verifying the backend cert at the ingress (NGINX)

By default NGINX Ingress talks TLS to the upstream when `backend-protocol: HTTPS`/`GRPCS` is set, but **does not verify the upstream cert** — any cert is accepted. For Zero-Trust networks where this would leave a sidecar-interception gap, opt in via the `proxyVerify` sub-block on each protocol:

```yaml
global:
  tls:
    orchestration:
      rest:
        enabled: true
        secret:
          existingSecret: orchestration-rest-cert
          type: pem
          existingSecretKey: tls.crt
          existingSecretPrivateKeyKey: tls.key
        proxyVerify:
          enabled: true
          caSecret:
            existingSecret: orchestration-upstream-ca # PEM CA bundle
            existingSecretKey: ca.crt
          sniHost: "" # set when the cert SAN does not match the in-cluster service name
      grpc:
        enabled: true
        secret:
          existingSecret: orchestration-grpc-cert
          existingSecretKey: tls.crt
          existingSecretPrivateKeyKey: tls.key
        proxyVerify:
          enabled: true
          caSecret:
            existingSecret: orchestration-upstream-ca
            existingSecretKey: ca.crt
```

This adds the following annotations to the `/orchestration` and gRPC ingresses respectively:

- `nginx.ingress.kubernetes.io/proxy-ssl-verify: on`
- `nginx.ingress.kubernetes.io/proxy-ssl-secret: <namespace>/<caSecret.existingSecret>`
- `nginx.ingress.kubernetes.io/proxy-ssl-name: <sniHost>` and `proxy-ssl-server-name: on` (only when `sniHost` is set)

`proxyVerify` is opt-in independently per protocol — you can verify gRPC traffic only, REST only, or both. The CA Secret **must live in the same namespace as the Ingress resource** (an NGINX Ingress requirement). The chart fails template rendering if `proxyVerify.enabled: true` and `caSecret.existingSecret` is empty.

Note that `proxyVerify` covers only the NGINX → Orchestration leg. In-cluster Java clients (Web Modeler, Connectors) trust upstream certs through `global.tls.caBundle`, which is independent.

## Supported modes

| Mode                | `global.tls.orchestration.rest.enabled` | `global.tls.orchestration.grpc.enabled` | `/orchestration` ingress backend | gRPC ingress backend-protocol | Web Modeler gRPC | Connectors gRPC | REST clients |
| ------------------- | --------------------------------------- | --------------------------------------- | -------------------------------- | ----------------------------- | ---------------- | --------------- | ------------ |
| Plaintext (default) | `false`                                 | `false`                                 | HTTP                             | `GRPC`                        | `grpc://`        | `http://`       | `http://`    |
| REST TLS only       | `true`                                  | `false`                                 | HTTPS                            | `GRPC`                        | `grpc://`        | `http://`       | `https://`   |
| gRPC TLS only       | `false`                                 | `true`                                  | HTTP                             | `GRPCS`                       | `grpcs://`       | `https://`      | `http://`    |
| Both TLS            | `true`                                  | `true`                                  | HTTPS                            | `GRPCS`                       | `grpcs://`       | `https://`      | `https://`   |

The chart derives Web Modeler and Connectors endpoints automatically. Explicit `webModeler.restapi.clusters` and `connectors.configuration` blocks remain authoritative — set them only if you need an endpoint shape the helpers do not produce.

## Example: REST plaintext + gRPC TLS

This is the SUPPORT-33090 customer shape: an internal Zero-Trust network where the gRPC API must be TLS-protected but the REST API stays on plaintext behind the cluster ingress.

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
        secret:
          existingSecret: orchestration-grpc-cert
          existingSecretKey: tls.crt
          existingSecretPrivateKeyKey: tls.key
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
- Annotates the public gRPC ingress with `nginx.ingress.kubernetes.io/backend-protocol: GRPCS`.
- Renders the Web Modeler REST API ConfigMap with `grpc: grpcs://<orchestration-grpc-service>:26500`.
- Renders the Connectors ConfigMap with `grpc-address: https://<orchestration-grpc-service>:26500`.

Trust material for in-cluster Java components flows through [`global.tls.caBundle`](./secret-management.md). The CA bundle is mounted as a Java truststore into Orchestration, Web Modeler, Connectors, and any other Java components in the release.

## Verification

After deploying, confirm the in-cluster endpoints match the chosen mode:

```shell
kubectl -n <namespace> get ingress <release>-grpc \
  -o jsonpath='{.metadata.annotations.nginx\.ingress\.kubernetes\.io/backend-protocol}{"\n"}'

kubectl -n <namespace> get configmap <release>-connectors \
  -o jsonpath='{.data.application\.yaml}' | grep -E 'grpc-address|rest-address'

kubectl -n <namespace> get configmap <release>-web-modeler-restapi \
  -o jsonpath='{.data.application\.yaml}' | grep -E '^\s+(grpc|rest):'
```

## Connectors TLS

Connectors in 8.10 runs its own Spring Boot HTTP server and is exposed through a Gateway API `HTTPRoute` (not via an NGINX ingress). `global.tls.connectors` mirrors the Orchestration REST surface and configures TLS termination at the Connectors pod.

### Modes

- **PKCS12 (default)** — `secret.type: pkcs12`. The chart sets `SERVER_SSL_KEY_STORE`, `SERVER_SSL_KEY_STORE_TYPE=PKCS12`, and `SERVER_SSL_KEY_STORE_PASSWORD` (from a `secretKeyRef`) on the Connectors container. Use when you manage keystores out-of-band (Java PKI, internal CA).
- **PEM (cert-manager compatible)** — `secret.type: pem`. The chart sets `SERVER_SSL_CERTIFICATE` and `SERVER_SSL_CERTIFICATE_PRIVATE_KEY` on the Connectors container. Compatible with cert-manager `kubernetes.io/tls` Secrets out of the box.

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
      secret:
        existingSecret: connectors-tls-keystore
        existingSecretKey: keystore.p12
        existingSecretPasswordKey: keystore-password
        keyAlias: connectors-rest
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
      secret:
        existingSecret: connectors-cert
        type: pem
    caBundle:
      secret:
        existingSecret: camunda-internal-ca
        existingSecretKey: ca.crt
```

With a cert-manager `Certificate` that issues into the same namespace, the resulting `kubernetes.io/tls` Secret already carries `tls.crt` and `tls.key` — the chart picks them up automatically (the PKCS12 default `existingSecretKey: keystore.p12` is auto-substituted to `tls.crt` in PEM mode).

### Gateway API caveat

In 8.10, Connectors is exposed via the Gateway API `HTTPRoute`, not via an NGINX `Ingress`. Backend HTTPS for Gateway API is configured at the listener / Service level on the gateway implementation — not via NGINX `backend-protocol` annotations. The `global.tls.connectors.proxyVerify` block is reserved for parity with the Orchestration surface and has no effect on the Gateway API path today. Intra-cluster TLS terminates at the Connectors pod with this configuration; backend-protocol selection for the gateway listener is a separate concern.

### Verification

```shell
kubectl -n <namespace> get deployment <release>-connectors \
  -o jsonpath='{.spec.template.spec.containers[0].env}' | jq '.[] | select(.name|startswith("SERVER_SSL_"))'

kubectl -n <namespace> get deployment <release>-connectors \
  -o jsonpath='{.spec.template.spec.containers[0].readinessProbe.httpGet.scheme}{"\n"}'
```

## Optimize TLS

Optimize in 8.10 runs its own Spring Boot HTTP server and is exposed through a Gateway API `HTTPRoute` (not via an NGINX ingress). `global.tls.optimize` mirrors the Orchestration REST surface and configures TLS termination at the Optimize pod.

This server-side TLS is independent of the existing client-side `optimize.database.elasticsearch.tls` / `optimize.database.opensearch.tls` (and legacy `global.elasticsearch.tls.existingSecret` / `global.opensearch.tls.existingSecret`) truststore wiring, which secures the Optimize → ES/OS connection direction. Both can be configured together; the chart mounts the server-side keystore as a separate `optimize-server-tls` volume that coexists with the existing client-side `keystore` truststore mount.

### Modes

- **PKCS12 (default)** — `secret.type: pkcs12`. The chart sets `SERVER_SSL_KEY_STORE`, `SERVER_SSL_KEY_STORE_TYPE=PKCS12`, and `SERVER_SSL_KEY_STORE_PASSWORD` (from a `secretKeyRef`) on the Optimize main container. Use when you manage keystores out-of-band (Java PKI, internal CA).
- **PEM (cert-manager compatible)** — `secret.type: pem`. The chart sets `SERVER_SSL_CERTIFICATE` and `SERVER_SSL_CERTIFICATE_PRIVATE_KEY` on the Optimize main container. Compatible with cert-manager `kubernetes.io/tls` Secrets out of the box.

In both modes the chart:

- Sets `SERVER_SSL_ENABLED=true` on the Optimize main container (and only the main container — the optional `migration` init container is untouched, since it does not serve HTTP).
- Mounts the referenced Secret at `/usr/local/camunda/certificates/optimize/` as a `optimize-server-tls` projected Secret volume with mode `0440`.
- Switches the container probes (`startupProbe` / `readinessProbe` / `livenessProbe`) to `HTTPS` when the user has left the probe `scheme` at its default `HTTP`.
- Stamps a `checksum/optimize-tls` pod annotation when `global.tls.optimize.autoRollout: true`, so the next `helm upgrade` rolls Optimize on cert rotation.

### Server-side vs client-side TLS in Optimize

The two surfaces are deliberately orthogonal:

| Direction                     | Values key                                                                                  | Volume name           | Purpose                                                                               |
| ----------------------------- | ------------------------------------------------------------------------------------------- | --------------------- | ------------------------------------------------------------------------------------- |
| Inbound (clients → Optimize)  | `global.tls.optimize.secret.existingSecret`                                                 | `optimize-server-tls` | Server identity cert + key for the Optimize HTTP listener (this guide).               |
| Outbound (Optimize → ES / OS) | `optimize.database.elasticsearch.tls.secret.existingSecret` (or `…opensearch.tls.secret.…`) | `keystore`            | Truststore so Optimize trusts the ES / OS server cert when calling secondary storage. |

Operators commonly need both at once (mTLS-style hardening across the whole data plane). The chart supports both simultaneously; the regression test suite asserts that the `optimize-server-tls` and `keystore` volumes coexist with their respective mounts on the Optimize main container.

### PKCS12 example

```yaml
global:
  tls:
    optimize:
      enabled: true
      secret:
        existingSecret: optimize-tls-keystore
        existingSecretKey: keystore.p12
        existingSecretPasswordKey: keystore-password
        keyAlias: optimize-rest
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
      secret:
        existingSecret: optimize-cert
        type: pem
    caBundle:
      secret:
        existingSecret: camunda-internal-ca
        existingSecretKey: ca.crt
```

With a cert-manager `Certificate` that issues into the same namespace, the resulting `kubernetes.io/tls` Secret already carries `tls.crt` and `tls.key` — the chart picks them up automatically (the PKCS12 default `existingSecretKey: keystore.p12` is auto-substituted to `tls.crt` in PEM mode).

### Combined server + client TLS example

```yaml
global:
  tls:
    optimize:
      enabled: true
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

### Gateway API caveat

In 8.10, Optimize is exposed via the Gateway API `HTTPRoute`, not via an NGINX `Ingress`. Backend HTTPS for Gateway API is configured at the listener / Service level on the gateway implementation — not via NGINX `backend-protocol` annotations. The `global.tls.optimize.proxyVerify` block is reserved for parity with the Orchestration surface and has no effect on the Gateway API path today. Intra-cluster TLS terminates at the Optimize pod with this configuration; backend-protocol selection for the gateway listener is a separate concern.

### Verification

```shell
kubectl -n <namespace> get deployment <release>-optimize \
  -o jsonpath='{.spec.template.spec.containers[0].env}' | jq '.[] | select(.name|startswith("SERVER_SSL_"))'

kubectl -n <namespace> get deployment <release>-optimize \
  -o jsonpath='{.spec.template.spec.containers[0].readinessProbe.httpGet.scheme}{"\n"}'

kubectl -n <namespace> get deployment <release>-optimize \
  -o jsonpath='{range .spec.template.spec.volumes[*]}{.name}{"\n"}{end}' | grep -E 'optimize-server-tls|keystore'
```
