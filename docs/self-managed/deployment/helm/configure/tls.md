---
id: tls
sidebar_label: TLS configuration
title: TLS configuration for Camunda 8 Self-Managed
description: "End-to-end guide for enabling TLS across Camunda 8 components and their backing datastores using the official Helm chart's values-tls.yaml overlay."
---

:::info Applies to

Camunda 8.10+ (Helm chart 15.x+). The `global.tls.caBundle` machinery and the `values-tls.yaml` overlay are introduced in chart 15.x; older charts (8.7/8.8 ≈ chart 13.x, 8.9 ≈ chart 14.x) do not ship this overlay.

:::

This guide describes how to enable TLS for Camunda 8 Self-Managed component connections — including connections to Elasticsearch, OpenSearch, and SQL/relational datastores — using the official `values-tls.yaml` overlay shipped with the Helm chart.

## What's covered

| Connection | Status | Mechanism |
| --- | :---: | --- |
| Camunda components → Elasticsearch (private CA, self-hosted or AWS) | ✅ | `global.tls.caBundle` |
| Camunda components → OpenSearch (private CA, self-hosted or AWS-managed) | ✅ | `global.tls.caBundle` |
| Camunda components → PostgreSQL JDBC (`sslmode=verify-full` + CA) | ✅ | `global.tls.caBundle` + JDBC URL |
| Camunda components → external OIDC issuer with private CA (Entra, Okta, internal Keycloak) | ✅ | `global.tls.caBundle` |
| Browser / external client → ingress / GatewayAPI (UI, gRPC) | ✅ | Standard Kubernetes ingress TLS — configured separately via per-component `*.ingress.tls` or `global.gateway.tls`, **not** via `global.tls.caBundle`. See the [Helm chart ingress configuration](https://docs.camunda.io/docs/self-managed/deployment/helm/configure/) reference. |
| In-cluster pod-to-pod transport (Operate ↔ Zeebe gateway, Connectors ↔ gateway, etc.) | ❌ | Requires a service mesh (Linkerd, Istio, Cilium) |

This boundary — chart-supported component-to-datastore TLS and external edges, with in-cluster transport delegated to a service mesh — is the explicit scope of the chart-level TLS deliverable.

## How it works

### Why one PEM bundle reaches both worlds

Camunda components are split between two trust ecosystems with incompatible expectations:

| World | Examples | Trust input format |
| --- | --- | --- |
| OS / OpenSSL native | libcurl in init scripts, Go's `crypto/x509`, the OpenSearch native client (post-8.6.7), PostgreSQL JDBC's `sslrootcert=` flag | PEM (text), via `SSL_CERT_FILE` / file path |
| JVM | Operate, Tasklist, Optimize, Web Modeler restapi, Identity, Connectors, Zeebe broker | **Keystore** (binary PKCS12 or JKS), via `-Djavax.net.ssl.trustStore=…` |
| Node.js | Console, Web Modeler websockets | PEM, via `NODE_EXTRA_CA_CERTS` |

The JVM **does not read PEM bundles** — `-Djavax.net.ssl.trustStore=` only accepts a binary keystore (PKCS12 or JKS). So historically, customers wanting Java to trust a private CA had to:

1. Run `keytool -importcert` themselves on a host with a JDK to produce a JKS file.
2. Manage a keystore password alongside the file.
3. Reference the keystore Secret + key + password from a per-component values block (`orchestration.data.secondaryStorage.elasticsearch.tls.secret.…`, `optimize.database.…`, …).
4. Add `-Djavax.net.ssl.trustStoreType=jks -Djavax.net.ssl.trustStorePassword=…` to `javaOpts`.

This is the trust-gap reported in [`camunda-platform-helm#3498`](https://github.com/camunda/camunda-platform-helm/issues/3498). The chart now bridges the two worlds for you: you supply PEM, the chart converts to a keystore at pod start.

### What the chart does at deploy time

The `values-tls.yaml` overlay wires a single user-supplied CA bundle through every component:

1. The PEM bundle is mounted at `/etc/camunda/tls/ca.crt` (read-only).
2. `SSL_CERT_FILE=/etc/camunda/tls/ca.crt` and `NODE_EXTRA_CA_CERTS=/etc/camunda/tls/ca.crt` are set on every component. `SSL_CERT_FILE` is picked up by OpenSSL-linked libraries (libcurl, Go's `crypto/x509` on Linux, the post-8.6.7 OpenSearch native client). `NODE_EXTRA_CA_CERTS` is picked up by Node.js components (Console, Web Modeler websockets).
3. A dedicated init container per Java component **builds the keystore the JVM will read**:
   - Copies `$JAVA_HOME/lib/security/cacerts` (the JDK's own truststore — PKCS12 format on Java 21, contains all public/well-known CAs) into a shared `emptyDir`.
   - Runs `keytool -importcert -keystore <copied cacerts> -file /etc/camunda/tls/ca.crt -alias camunda-user-ca` to **append the user CA** to the copy.
   - Result: a PKCS12 truststore at `/var/camunda/tls-truststore/cacerts` containing **public CAs + your CA**. Public-CA endpoints (cloud APIs, public-CA OIDC) keep working alongside your private CA.
   - The truststore is rebuilt fresh on every pod start — CA rotation is just "replace the Secret + `kubectl rollout restart`", no stale keystore baggage.
4. `JAVA_TOOL_OPTIONS` is prepended with `-Djavax.net.ssl.trustStore=/var/camunda/tls-truststore/cacerts -Djavax.net.ssl.trustStorePassword=changeit`. The chart deliberately does **not** set `-Djavax.net.ssl.trustStoreType` because the JVM default (PKCS12 on Java 21) matches the truststore the init container produces. JVM HTTP clients (Apache `httpcore5`, the `OperateOpenSearchConnector`, PostgreSQL JDBC) automatically trust the user CA.

:::caution `SSL_CERT_FILE` replaces the system bundle

For OpenSSL-linked clients, `SSL_CERT_FILE` **replaces** the default system CA bundle rather than augmenting it. The bundle you supply must therefore include every root needed by every TLS destination you call — including public CAs (AWS / Azure / GCP API endpoints, public-CA OIDC issuers) if any connector or component reaches them. The simplest pattern is to concatenate the OS-bundled `/etc/ssl/certs/ca-certificates.crt` with your private CA before creating the Secret:

```bash
cat /etc/ssl/certs/ca-certificates.crt your-private-ca.pem > camunda-ca-bundle.pem
```

:::

:::caution Python `requests` does not honour `SSL_CERT_FILE`

If a Python-based connector calls TLS endpoints with a private CA, set `REQUESTS_CA_BUNDLE=/etc/camunda/tls/ca.crt` on that container's env via per-component `*.env` overrides — `requests` reads `REQUESTS_CA_BUNDLE` / `CURL_CA_BUNDLE`, not `SSL_CERT_FILE`.

:::

This combination handles both library categories without requiring a root init container, custom images, or per-component overrides — closing the long-standing trust gap reported in [`camunda-platform-helm#3498`](https://github.com/camunda/camunda-platform-helm/issues/3498).

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

Download the overlay first (the file ships in the chart repo, not in your local `helm repo` cache):

```bash
curl -fsSLO https://raw.githubusercontent.com/camunda/camunda-platform-helm/main/charts/camunda-platform-8.10/values-tls.yaml
```

Then install or upgrade with the overlay applied alongside your existing values:

```bash
helm upgrade --install camunda camunda/camunda-platform \
  --version 15.x \
  --namespace "$NAMESPACE" \
  -f values-tls.yaml \
  -f your-values.yaml
```

`values-tls.yaml` references the `camunda-ca-bundle` Secret you created in step 1 and wires it into every Java component automatically. `your-values.yaml` is whatever scenario / persistence values your deployment needs (datastore URLs, credentials, ingress hosts, IdP config). The TLS overlay is **additive and idempotent** — it does not replace your scenario, only adds the trust input.

### 3. Verify the deployment

After the rollout completes, confirm the trust wiring landed in pods:

```bash
kubectl -n "$NAMESPACE" get pod -l app.kubernetes.io/component=zeebe-broker -o yaml | \
  grep -A 1 'JAVA_TOOL_OPTIONS\|SSL_CERT_FILE\|ca-bundle'
```

Expected:
- `SSL_CERT_FILE: /etc/camunda/tls/ca.crt`
- `JAVA_TOOL_OPTIONS` containing `-Djavax.net.ssl.trustStore=/var/camunda/tls-truststore/cacerts`
- A `ca-bundle` volume sourced from `camunda-ca-bundle`
- A `ca-bundle-truststore` `emptyDir` volume populated by the init container

A regression-style assertion is also available — see [Verify no plaintext fallback](#verify-no-plaintext-fallback) below.

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
The legacy Zeebe ElasticsearchExporter (which writes the `zeebe-record-*` indices that Operate consumes) has its own auth env path: `ZEEBE_BROKER_EXPORTERS_ELASTICSEARCH_ARGS_AUTHENTICATION_USERNAME` / `_PASSWORD`. The standard `secondaryStorage.elasticsearch.auth` does NOT fill it. If you use this exporter, set the env vars explicitly via `orchestration.env`.
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
        enabled: false   # set true + remove auth.* for IRSA against AWS-managed OpenSearch
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

PostgreSQL JDBC reads the CA in PEM directly via `sslrootcert`. The CA is already mounted at `/etc/camunda/tls/ca.crt` by `global.tls.caBundle`, so the JDBC URL just needs `sslmode=verify-full` + `sslrootcert` pointing there:

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

Public-CA issuers (`login.microsoftonline.com`, `accounts.google.com`) work out of the box — the JVM ships with a public CA bundle. Set this only when your IdP uses a **private** or **internal** CA, which must be in the bundle you supplied to `global.tls.caBundle`.

```yaml
global:
  identity:
    auth:
      issuerBackendUrl: "https://your-idp.example.com/realms/camunda"
      tokenUrl:         "https://your-idp.example.com/realms/camunda/protocol/openid-connect/token"
      jwksUrl:          "https://your-idp.example.com/realms/camunda/protocol/openid-connect/certs"
      authUrl:          "https://your-idp.example.com/realms/camunda/protocol/openid-connect/auth"
```

## cert-manager integration

The chart does not depend on cert-manager — the recommended pattern is to issue the bundle Secret via a `Certificate` resource and reference it as `global.tls.caBundle.secret.existingSecret`:

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

Then ensure `existingSecretKey` matches cert-manager's output (`ca.crt` for the issuing CA, `tls.crt` for the leaf). The default in `values-tls.yaml` is `ca.crt`.

:::caution Trust-anchor scope and PKI completeness

Two important boundaries:

1. **`global.tls.caBundle` is a trust-anchor bundle.** Java's PKIX path builder needs a chain that ends at a root present in this Secret. If your `ClusterIssuer` is itself signed by an offline root CA, the cert-manager output above contains only the issuing intermediate — you **must** also include the offline root in the bundle (concatenate before creating the Secret) or PKIX validation fails for any server cert that chains through a different intermediate.
2. **This recipe issues the trust-anchor bundle only.** Server certs for Elasticsearch / OpenSearch / PostgreSQL must be issued separately by additional `Certificate` resources signed by the same `ClusterIssuer`, with `dnsNames` / `ipAddresses` matching each server's service name. The TLS overlay does not provision those.

:::

## Verify no plaintext fallback

A small regression check ships with the Helm chart that scans pod env vars in a namespace and fails if any URL points at a known datastore service over plain HTTP, or if any `jdbc:postgresql://` URL omits TLS. The script lives in `camunda-platform-helm`, not in this docs repo — fetch it from the chart repo before running:

```bash
curl -fsSLO https://raw.githubusercontent.com/camunda/camunda-platform-helm/main/scripts/check-no-plaintext-datastore.sh
chmod +x check-no-plaintext-datastore.sh

./check-no-plaintext-datastore.sh \
  --namespace "$NAMESPACE" \
  --kube-context "$KUBE_CONTEXT"
```

Exit code 0 + `[no-plaintext-check] PASS` means no Camunda pod is talking plaintext to a known datastore service name.

## Updating the CA

To rotate the CA bundle, replace the Secret atomically and bounce only the Camunda workloads:

```bash
kubectl -n "$NAMESPACE" create secret generic camunda-ca-bundle \
  --from-file=ca.crt=./new-ca-bundle.pem \
  --dry-run=client -o yaml | kubectl -n "$NAMESPACE" apply -f -

# Restart only Camunda-platform workloads — bare `rollout restart statefulset,deployment`
# also bounces the bundled Bitnami PostgreSQL / Elasticsearch StatefulSets and any
# co-tenants in the namespace. Use the part-of label so the blast radius is scoped.
kubectl -n "$NAMESPACE" rollout restart \
  statefulset,deployment \
  -l app.kubernetes.io/part-of=camunda-platform
```

The init container re-runs on each pod start and imports the new CA into a fresh truststore. Apply (rather than delete + create) avoids a window where the Secret does not exist; any pod evicted, OOM-killed, or rescheduled in that window would otherwise hit `CreateContainerConfigError`.

## Legacy: per-component JKS truststore (deprecated)

Before this overlay shipped, customers had to author a JKS truststore offline (`keytool -importcert`) and reference it from a per-component values block plus `javaOpts` flags. The chart still honours those fields for backward compatibility, but they are **deprecated as of chart 15.x and slated for removal in a future major release**.

Affected fields (all deprecated):

- `global.elasticsearch.tls.secret.existingSecret` / `existingSecretKey`
- `global.opensearch.tls.secret.existingSecret` / `existingSecretKey`
- `global.elasticsearch.tls.jks.secret.*` (introduced in chart 14.x for password injection)
- `global.opensearch.tls.jks.secret.*`
- `orchestration.data.secondaryStorage.elasticsearch.tls.secret.*`
- `orchestration.data.secondaryStorage.opensearch.tls.secret.*`
- `optimize.database.elasticsearch.tls.secret.*`
- `optimize.database.opensearch.tls.secret.*`

If both a legacy JKS field and `global.tls.caBundle` are set on the same component, the legacy JKS field takes precedence (the chart preserves existing behavior). To migrate:

1. Convert your JKS to a PEM CA bundle:
   ```bash
   keytool -list -keystore your.jks -storepass changeit -rfc \
     | awk '/-----BEGIN CERTIFICATE-----/,/-----END CERTIFICATE-----/' \
     > your-ca-bundle.pem
   ```
2. Create the `camunda-ca-bundle` Secret as in [step 1](#1-create-the-ca-bundle-secret).
3. Remove every `*.tls.secret.existingSecret` / `*.tls.jks.*` entry from your values file.
4. Remove `-Djavax.net.ssl.trustStore…` and `-Djavax.net.ssl.trustStoreType=jks` from `javaOpts` on every component.
5. `helm upgrade` with `-f values-tls.yaml` — the chart wires the new path automatically and the JKS path becomes dormant.

After migration, you have one PEM Secret managed in one place instead of N per-component JKS references.

## Common gotchas

### Java 21 default `trustStoreType` is PKCS12

The `values-tls.yaml` overlay's init container copies the JDK system `cacerts` (PKCS12 on Java 21) and appends the user CA via `keytool -importcert` without converting the format — the chart-built truststore is **PKCS12**, and the helper relies on the JVM default by NOT setting `-Djavax.net.ssl.trustStoreType`. If you instead supply your own legacy JKS via a per-component `tls.secret.existingSecret`, that path takes precedence and your `javaOpts` must explicitly set `-Djavax.net.ssl.trustStoreType=jks`. (See [legacy JKS](#legacy-per-component-jks-truststore-deprecated) above — both fields are deprecated.)

### Bitnami PostgreSQL `tls.certCAFilename` flips the server into mTLS mode

If you operate the bundled Bitnami PostgreSQL subchart with TLS enabled, do **not** set `tls.certCAFilename` — it switches PostgreSQL into client-cert verification mode (`clientcert=verify-full` in `pg_hba.conf`), which breaks every plain client. Use `tls.certFilename` and `tls.certKeyFilename` only.

### Console and Web Modeler websockets are Node.js

Both Console (`camunda/hub-console`) and Web Modeler websockets (`camunda/hub-websockets`) are Node-based. The chart helper emits both `SSL_CERT_FILE` AND `NODE_EXTRA_CA_CERTS` on every Node component automatically — no manual `console.env` or `webModeler.websockets.env` override is required. Adding `NODE_EXTRA_CA_CERTS` manually creates a duplicate env entry, which Kubernetes treats as undefined (last-wins) behavior; do not do it.

## What still requires a service mesh

This chart does **not** provision pod-to-pod mTLS for in-cluster service traffic. The following connections are plaintext by default and need a service mesh (Linkerd, Istio, Cilium) to encrypt at the pod level:

- Operate / Tasklist / Connectors → Zeebe gateway (gRPC, in-cluster)
- Web Modeler / Console / Optimize → Identity (REST, in-cluster)
- Spring Boot management / metrics endpoints (probes use scheme `HTTP`)

This boundary is explicit in the [`camunda-platform-helm` TLS coverage matrix](https://github.com/camunda/camunda-platform-helm/blob/main/docs/tls-coverage-810.md) and matches the scope of the chart-level TLS deliverable.

## Validate against Web Modeler Play

When `values-tls.yaml` is applied, Camunda 8.10's "Play" feature in Web Modeler continues to function — Play uses the same orchestration + secondary storage path that the trust input covers. To confirm in your environment, deploy a process model in Web Modeler and start a Play instance; if the orchestration cluster's connection to its secondary storage is healthy, Play succeeds. If you see TLS handshake errors specifically from the websockets pod, see the gotcha above about `NODE_EXTRA_CA_CERTS`.

## Related

- [Helm chart TLS coverage matrix](https://github.com/camunda/camunda-platform-helm/blob/main/docs/tls-coverage-810.md) — per-connection support level with PR / scenario references
- [Helm chart `values-tls.yaml`](https://github.com/camunda/camunda-platform-helm/blob/main/charts/camunda-platform-8.10/values-tls.yaml) — the overlay this guide describes
- [`camunda-platform-helm#3498`](https://github.com/camunda/camunda-platform-helm/issues/3498) — the long-standing customer issue this guide closes
- [`product-hub#3520`](https://github.com/camunda/product-hub/issues/3520) — the umbrella TLS-everywhere epic
