---
id: tls
sidebar_label: TLS configuration
title: Configure TLS
description: "Enable TLS for Camunda 8 Self-Managed component connections to datastores using the Helm chart's values-tls.yaml overlay."
---

## What's covered

| Connection                                                                                 | Mechanism                                                                                                                                                                                     |
| ------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Camunda components → Elasticsearch (private CA, self-hosted or AWS)                        | `global.tls.caBundle`                                                                                                                                                                         |
| Camunda components → OpenSearch (private CA, self-hosted or AWS-managed)                   | `global.tls.caBundle`                                                                                                                                                                         |
| Camunda components → PostgreSQL JDBC (`sslmode=verify-full` + CA)                          | `global.tls.caBundle` + JDBC URL                                                                                                                                                              |
| Camunda components → external OIDC issuer with private CA (Entra, Okta, internal Keycloak) | `global.tls.caBundle`                                                                                                                                                                         |
| Browser / external client → Ingress / GatewayAPI (UI, gRPC)                                | Standard Kubernetes Ingress TLS — configured via per-component `*.ingress.tls` or `global.gateway.tls`, _not_ `global.tls.caBundle`. See [Ingress configuration](./ingress/ingress-setup.md). |

In-cluster pod-to-pod traffic is not covered by this overlay — see [In-cluster transport (service mesh required)](#in-cluster-transport-service-mesh-required).

## How it works

Camunda components span three trust ecosystems that each require a different CA input format:

| Runtime             | Components                                                                                       | Trust input                                           |
| ------------------- | ------------------------------------------------------------------------------------------------ | ----------------------------------------------------- |
| OS / OpenSSL native | libcurl, Go `crypto/x509`, OpenSearch native client (post-8.6.7), PostgreSQL JDBC `sslrootcert=` | PEM via `SSL_CERT_FILE`                               |
| JVM                 | Operate, Tasklist, Optimize, Web Modeler restapi, Identity, Connectors, Zeebe broker             | PKCS12/JKS keystore via `-Djavax.net.ssl.trustStore=` |
| Node.js             | Console, Web Modeler websockets                                                                  | PEM via `NODE_EXTRA_CA_CERTS`                         |

The `values-tls.yaml` overlay bridges all three from a single PEM bundle:

1. Mounts the bundle at `/etc/camunda/tls/ca.crt`.
2. Sets `SSL_CERT_FILE` and `NODE_EXTRA_CA_CERTS` to that path on every component.
3. Runs a per-JVM-component init container that copies the JRE's `cacerts` (PKCS12 on Java 21) into a shared `emptyDir` and imports each certificate in the bundle via `keytool -importcert`. Override `global.tls.caBundle.image` only if a component image lacks `keytool`.
4. Prepends `JAVA_TOOL_OPTIONS` with `-Djavax.net.ssl.trustStore=/var/camunda/tls-truststore/cacerts -Djavax.net.ssl.trustStorePassword=changeit`.

:::caution `SSL_CERT_FILE` replaces the system bundle

`SSL_CERT_FILE` _replaces_ (not appends to) the OS CA bundle for OpenSSL clients. Include all public CAs your components reach alongside your private CA:

```bash
cat /etc/ssl/certs/ca-certificates.crt your-private-ca.pem > camunda-ca-bundle.pem
```

Python-based connector containers are an exception: `requests` reads `REQUESTS_CA_BUNDLE` / `CURL_CA_BUNDLE`, not `SSL_CERT_FILE`. Set `REQUESTS_CA_BUNDLE=/etc/camunda/tls/ca.crt` on those containers.

:::

## Quickstart

### Prerequisites

- Helm 3.10+
- A PEM-encoded CA bundle file (`your-ca-bundle.pem`) containing the root and any intermediate certs that signed your datastore / IdP certs

### 1. Create the CA bundle Secret

```bash
NAMESPACE=camunda

kubectl create namespace "$NAMESPACE" --dry-run=client -o yaml | kubectl apply -f -

kubectl -n "$NAMESPACE" create secret generic camunda-ca-bundle \
  --from-file=ca.crt=./your-ca-bundle.pem
```

### 2. Apply the overlay

Download the overlay (ships in the chart repo, not in the `helm repo` cache):

```bash
curl -fsSLO https://raw.githubusercontent.com/camunda/camunda-platform-helm/main/charts/camunda-platform-8.9/values-tls.yaml
```

Install or upgrade with the overlay:

```bash
helm upgrade --install camunda camunda/camunda-platform \
  --version 14.x \
  --namespace "$NAMESPACE" \
  -f values-tls.yaml \
  -f your-values.yaml
```

`your-values.yaml` provides datastore URLs, credentials, and other scenario config. The TLS overlay is additive — it does not replace your existing values.

Download the overlay from the same chart version you install. The `main` branch tracks the latest chart, so if you pin a specific chart release, fetch `values-tls.yaml` from the matching release tag instead of `main`.

### 3. Verify

Confirm `SSL_CERT_FILE`, `JAVA_TOOL_OPTIONS` (with truststore path), and a `ca-bundle` volume appear in the pod spec:

```bash
kubectl -n "$NAMESPACE" get pod -l app.kubernetes.io/component=zeebe-broker -o yaml | \
  grep -A 1 'JAVA_TOOL_OPTIONS\|SSL_CERT_FILE\|ca-bundle'
```

See also [Verify no plaintext fallback](#verify-no-plaintext-fallback).

## Configuring datastore TLS

`values-tls.yaml` ships commented templates for each datastore. Uncomment and fill in the section that matches your backend.

### Elasticsearch

```yaml
orchestration:
  data:
    secondaryStorage:
      type: elasticsearch
      elasticsearch:
        url: "https://your-elasticsearch.example.com:9200"
        auth:
          username: elastic
          secret:
            existingSecret: "your-elasticsearch-credentials"
            existingSecretKey: password

optimize:
  database:
    elasticsearch:
      enabled: true
      url:
        protocol: https
        host: "your-elasticsearch.example.com"
        port: 9200
      auth:
        username: elastic
        secret:
          existingSecret: "your-elasticsearch-credentials"
          existingSecretKey: password
```

:::note
The Zeebe ElasticsearchExporter uses its own auth env path (`ZEEBE_BROKER_EXPORTERS_ELASTICSEARCH_ARGS_AUTHENTICATION_USERNAME` / `_PASSWORD`). `secondaryStorage.elasticsearch.auth` does not fill it — set those env vars via `orchestration.env` if needed.
:::

### OpenSearch

```yaml
orchestration:
  data:
    secondaryStorage:
      type: opensearch
      opensearch:
        url: "https://your-opensearch.example.com:9200"
        auth:
          username: admin
          secret:
            existingSecret: "your-opensearch-credentials"
            existingSecretKey: password

optimize:
  database:
    opensearch:
      enabled: true
      aws:
        enabled: false # set true + remove auth.* for IRSA against AWS-managed OpenSearch
      url:
        protocol: https
        host: "your-opensearch.example.com"
        port: 9200
      auth:
        username: admin
        secret:
          existingSecret: "your-opensearch-credentials"
          existingSecretKey: password
```

For AWS-managed OpenSearch with IRSA, leave `auth` unset and configure `aws.enabled: true` plus the appropriate service account annotations.

### PostgreSQL (RDBMS exporter)

The CA is mounted at `/etc/camunda/tls/ca.crt` — reference it directly in the JDBC URL:

```yaml
orchestration:
  data:
    secondaryStorage:
      type: rdbms
      rdbms:
        url: "jdbc:postgresql://your-postgres.example.com:5432/orchestration?sslmode=verify-full&sslrootcert=/etc/camunda/tls/ca.crt"
        username: camunda
        secret:
          existingSecret: "your-postgres-credentials"
          existingSecretKey: password
```

### External OIDC issuer with private CA

Only required when your IdP uses a private or internal CA. Public-CA issuers (Entra, Google) work without additional configuration.

```yaml
global:
  identity:
    auth:
      issuerBackendUrl: "https://your-idp.example.com/realms/camunda"
      tokenUrl: "https://your-idp.example.com/realms/camunda/protocol/openid-connect/token"
      jwksUrl: "https://your-idp.example.com/realms/camunda/protocol/openid-connect/certs"
      authUrl: "https://your-idp.example.com/realms/camunda/protocol/openid-connect/auth"
```

## cert-manager integration

Issue the CA bundle Secret via a `Certificate` resource and reference it as `global.tls.caBundle.secret.existingSecret`:

```yaml
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: camunda-ca-bundle
  namespace: camunda
spec:
  secretName: camunda-ca-bundle
  issuerRef:
    name: your-internal-ca-issuer
    kind: ClusterIssuer
  commonName: camunda-ca
  isCA: true
  duration: 8760h
  renewBefore: 720h
```

Set `existingSecretKey` to match cert-manager's output key (`ca.crt` by default in `values-tls.yaml`).

:::caution Include the full trust chain

If your `ClusterIssuer` is signed by an offline root CA, cert-manager outputs only the issuing intermediate. Concatenate the offline root into the bundle before creating the Secret — PKIX validation requires a chain that ends at a root present in the bundle.

Server certs for Elasticsearch, OpenSearch, and PostgreSQL must be issued separately via additional `Certificate` resources signed by the same `ClusterIssuer`.

:::

## Install-time guardrails

After each `helm install` or `helm upgrade`, check the `NOTES.txt` output for these warnings (re-display it at any time with `helm status <release>`):

- Per-component JKS overrides the bundle. If a component has a legacy `tls.secret` JKS configured, the JKS takes precedence and the bundle is ignored for that component. Remove `tls.secret` to use the bundle.
- Bundle is trust, not encryption. `global.tls.caBundle` adds CA trust but does not enable TLS on a plaintext URL. Set the URL to `https://` (or set the JDBC `sslmode`).
- `JAVA_TOOL_OPTIONS` in component `env` overrides the truststore flags. Set it via `javaOpts` (orchestration, optimize, Web Modeler restapi) instead, which the chart appends to.

## Verify no plaintext fallback

```bash
curl -fsSLO https://raw.githubusercontent.com/camunda/camunda-platform-helm/main/scripts/check-no-plaintext-datastore.sh
chmod +x check-no-plaintext-datastore.sh

./check-no-plaintext-datastore.sh \
  --namespace "$NAMESPACE" \
  --kube-context "$KUBE_CONTEXT"
```

Exit code 0 + `[no-plaintext-check] PASS` means no Camunda pod is talking plaintext to a known datastore.

## Updating the CA

```bash
kubectl -n "$NAMESPACE" create secret generic camunda-ca-bundle \
  --from-file=ca.crt=./new-ca-bundle.pem \
  --dry-run=client -o yaml | kubectl -n "$NAMESPACE" apply -f -

kubectl -n "$NAMESPACE" rollout restart \
  statefulset,deployment \
  -l app.kubernetes.io/part-of=camunda-platform
```

The init container re-runs on each pod start and imports the new CA into a fresh truststore.

### Optional: automatic rollout on `helm upgrade`

Set `global.tls.caBundle.autoRollout: true` to stamp a `checksum/ca-bundle` annotation on Java pods so `helm upgrade` triggers a rollout automatically when the CA Secret changes.

:::caution Constraints

- Requires `get` on Secrets in the release namespace — `lookup` fails with `Forbidden` without it.
- Argo CD and Flux render via `helm template` (no cluster access), so the annotation stays constant. Drive restarts from your GitOps stack instead.

:::

## Legacy: per-component JKS truststore (deprecated)

Deprecated as of chart 14.x. Affected fields:

- `global.elasticsearch.tls.secret.existingSecret` / `existingSecretKey`
- `global.opensearch.tls.secret.existingSecret` / `existingSecretKey`
- `global.elasticsearch.tls.jks.secret.*`
- `global.opensearch.tls.jks.secret.*`
- `orchestration.data.secondaryStorage.elasticsearch.tls.secret.*`
- `orchestration.data.secondaryStorage.opensearch.tls.secret.*`
- `optimize.database.elasticsearch.tls.secret.*`
- `optimize.database.opensearch.tls.secret.*`

If a legacy JKS field and `global.tls.caBundle` are both set, the legacy field takes precedence. To migrate:

1. Convert JKS to PEM:
   ```bash
   keytool -list -keystore your.jks -storepass changeit -rfc \
     | awk '/-----BEGIN CERTIFICATE-----/,/-----END CERTIFICATE-----/' \
     > your-ca-bundle.pem
   ```
2. Create the `camunda-ca-bundle` Secret as in [step 1](#1-create-the-ca-bundle-secret).
3. Remove all `*.tls.secret.existingSecret` / `*.tls.jks.*` entries from your values file.
4. Remove `-Djavax.net.ssl.trustStore…` and `-Djavax.net.ssl.trustStoreType=jks` from `javaOpts`.
5. Run `helm upgrade` with `-f values-tls.yaml`.

## Common gotchas

### Java 21 default `trustStoreType` is PKCS12

The init container builds a PKCS12 truststore; the chart omits `-Djavax.net.ssl.trustStoreType` to match the JVM default. If you supply a legacy JKS via `tls.secret.existingSecret`, add `-Djavax.net.ssl.trustStoreType=jks` to `javaOpts` explicitly.

### Bitnami PostgreSQL `tls.certCAFilename` enables mTLS

Do not set `tls.certCAFilename` on the bundled Bitnami PostgreSQL subchart. It switches PostgreSQL into `clientcert=verify-full` mode (`pg_hba.conf`) and breaks plain clients. Use `tls.certFilename` and `tls.certKeyFilename` only.

### Console and Web Modeler websockets are Node.js

The chart sets both `SSL_CERT_FILE` and `NODE_EXTRA_CA_CERTS` on Node.js components automatically. Do not add `NODE_EXTRA_CA_CERTS` via `console.env` or `webModeler.websockets.env` — Kubernetes last-wins env semantics make the value undefined.

## In-cluster transport (service mesh required)

`global.tls.caBundle` covers component-to-datastore and component-to-IdP connections only.
The following in-cluster connections are plaintext by default:

| Connection                                      | Protocol |
| ----------------------------------------------- | -------- |
| Operate / Tasklist / Connectors → Zeebe gateway | gRPC     |
| Web Modeler / Console / Optimize → Identity     | REST     |
| Spring Boot management / metrics (probes)       | HTTP     |

Encrypt these at the pod level with a service mesh (Linkerd, Istio, or Cilium). See the
[TLS coverage matrix](https://github.com/camunda/camunda-platform-helm/blob/main/docs/tls-coverage-810.md)
for the full connection inventory.

## Related

- [Helm chart TLS coverage matrix](https://github.com/camunda/camunda-platform-helm/blob/main/docs/tls-coverage-810.md) — per-connection support level
- [Helm chart `values-tls.yaml`](https://github.com/camunda/camunda-platform-helm/blob/main/charts/camunda-platform-8.9/values-tls.yaml) — the overlay this guide describes
