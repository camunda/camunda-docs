---
id: mtls
title: "Connect with mutual TLS (mTLS)"
description: "Present a client certificate from the Camunda Java client and Spring Boot Starter to a mutual TLS gateway in front of your Orchestration Cluster."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

With mutual TLS (mTLS), the Camunda Java client presents a client certificate when it opens the gRPC and REST connections to your Orchestration Cluster. Use it when your network requires every caller to prove its identity with a certificate before traffic reaches Camunda.

## Terminate mTLS on your own gateway

The Orchestration Cluster doesn't terminate mTLS itself. Its gRPC and REST APIs support server-side TLS only, so they don't request or verify client certificates. To require client certificates, run a gateway on your own infrastructure, such as a reverse proxy, an ingress controller, or a service mesh sidecar, in front of the cluster. Communication between cluster nodes also uses [server-side TLS only](/self-managed/components/orchestration-cluster/zeebe/security/secure-cluster-communication.md#how-it-works), so a service mesh is also the recommended way to get mTLS inside the cluster:

```text
Java client --(mTLS)--> your gateway --(TLS or plaintext)--> Orchestration Cluster
```

Your gateway must:

- Request a client certificate and verify it against the CA you issue client certificates from.
- Forward both the Orchestration Cluster REST API and the Zeebe gRPC API. The gRPC API needs HTTP/2 end to end.
- Present a server certificate the client trusts. See [Trust the gateway's server certificate](#trust-the-gateways-server-certificate).

mTLS secures the connection, but it doesn't authenticate your application to Camunda. Keep the client's [authentication](./getting-started.md#step-2a-connect-to-a-self-managed-orchestration-cluster) configured, for example OIDC or basic authentication, as you would without mTLS.

:::note
This page covers the certificate the client presents to the cluster connection. To authenticate to your identity provider's token endpoint with a certificate, use the **OIDC-based mutual TLS authentication** option in [Get started with the Java client](./getting-started.md#step-2a-connect-to-a-self-managed-orchestration-cluster). The two configurations are independent, and the client never reuses one for the other.
:::

## Configure the client certificate

You can provide the client identity as PEM files, as inline PEM content, or as a Java keystore. Use only one of these options. Both addresses must use `https`.

<Tabs groupId="mtls-identity" defaultValue="pem" queryString values={
[
{label: 'PEM files', value: 'pem' },
{label: 'Java keystore', value: 'keystore' },
]}>

<TabItem value="pem">

```java
try (CamundaClient client = CamundaClient.newClientBuilder()
        .grpcAddress(URI.create("https://camunda-gateway.example.com:443"))
        .restAddress(URI.create("https://camunda-gateway.example.com"))
        .clientCertificate("/etc/camunda/client.crt", "/etc/camunda/client.key")
        // Only needed if the private key is encrypted
        .clientKeyPassphrase(System.getenv("CLIENT_KEY_PASSPHRASE"))
        .mtlsCaCertificatePath("/etc/camunda/ca.crt")
        .build()) {

    client.newTopologyRequest().execute();
}
```

The certificate file contains the client certificate chain. The private key can be PKCS#8 (encrypted or unencrypted), PKCS#1 (`BEGIN RSA PRIVATE KEY`), or an EC key.

To pass the PEM content instead of file paths, for example from a secrets manager, use `clientCertificateContent(certificateChainPem, privateKeyPem)` and `mtlsCaCertificateContent(caPem)`.

</TabItem>

<TabItem value="keystore">

```java
try (CamundaClient client = CamundaClient.newClientBuilder()
        .grpcAddress(URI.create("https://camunda-gateway.example.com:443"))
        .restAddress(URI.create("https://camunda-gateway.example.com"))
        .clientKeystore("/etc/camunda/client.p12", System.getenv("KEYSTORE_PASSWORD"), null)
        .mtlsTruststore("/etc/camunda/truststore.p12", System.getenv("TRUSTSTORE_PASSWORD"))
        .build()) {

    client.newTopologyRequest().execute();
}
```

The client selects the keystore type from the file extension: `.p12` and `.pfx` are read as PKCS#12, and any other extension as JKS. If you pass `null` as the key password, the client uses the keystore password for the private key entry.

</TabItem>
</Tabs>

## Trust the gateway's server certificate

The client verifies the server certificate your gateway presents. If a public CA signed it, the JVM default trust store already trusts it and you don't need to configure anything.

If your own CA signed it, configure exactly one of the following:

| Option                       | Builder method                                                       | Environment variable                                               |
| ---------------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------ |
| PEM CA bundle                | `mtlsCaCertificatePath(caPath)` or `mtlsCaCertificateContent(caPem)` | `CAMUNDA_MTLS_CA_PATH` or `CAMUNDA_MTLS_CA`                        |
| Java truststore              | `mtlsTruststore(truststorePath, truststorePassword)`                 | `CAMUNDA_MTLS_TRUSTSTORE_PATH`, `CAMUNDA_MTLS_TRUSTSTORE_PASSWORD` |
| Existing CA certificate path | `caCertificatePath(path)`                                            | `CAMUNDA_CA_CERTIFICATE_PATH`                                      |

The mTLS CA bundle and truststore replace the JVM default trust store for the cluster connection, so they must contain every CA needed to verify your gateway.

## Configure mTLS with environment variables

The client reads the `CAMUNDA_MTLS_*` environment variables, which use the same names as the other Camunda SDKs. As with other client settings, environment variables override values set in code unless you call `.applyEnvironmentVariableOverrides(false)` on the builder.

```bash
export CAMUNDA_GRPC_ADDRESS='https://camunda-gateway.example.com:443'
export CAMUNDA_REST_ADDRESS='https://camunda-gateway.example.com'
export CAMUNDA_MTLS_CERT_PATH='/etc/camunda/client.crt'
export CAMUNDA_MTLS_KEY_PATH='/etc/camunda/client.key'
export CAMUNDA_MTLS_CA_PATH='/etc/camunda/ca.crt'
```

## Configure mTLS in the Camunda Spring Boot Starter

The Camunda Spring Boot Starter exposes the same settings under `camunda.client.mtls`:

```yaml
camunda:
  client:
    grpc-address: https://camunda-gateway.example.com:443
    rest-address: https://camunda-gateway.example.com
    mtls:
      cert-path: /etc/camunda/client.crt
      key-path: /etc/camunda/client.key
      key-passphrase: ${CLIENT_KEY_PASSPHRASE:}
      ca-path: /etc/camunda/ca.crt
```

To use a Java keystore instead, replace the PEM properties with `keystore-path`, `keystore-password`, and optionally `keystore-key-password`, `truststore-path`, and `truststore-password`.

## mTLS configuration reference

| Setting                       | Builder method                      | Environment variable                 | Spring Boot property                        |
| ----------------------------- | ----------------------------------- | ------------------------------------ | ------------------------------------------- |
| Client certificate chain file | `clientCertificate(certPath, …)`    | `CAMUNDA_MTLS_CERT_PATH`             | `camunda.client.mtls.cert-path`             |
| Client certificate chain PEM  | `clientCertificateContent(cert, …)` | `CAMUNDA_MTLS_CERT`                  | `camunda.client.mtls.cert`                  |
| Private key file              | `clientCertificate(…, keyPath)`     | `CAMUNDA_MTLS_KEY_PATH`              | `camunda.client.mtls.key-path`              |
| Private key PEM               | `clientCertificateContent(…, key)`  | `CAMUNDA_MTLS_KEY`                   | `camunda.client.mtls.key`                   |
| Private key passphrase        | `clientKeyPassphrase`               | `CAMUNDA_MTLS_KEY_PASSPHRASE`        | `camunda.client.mtls.key-passphrase`        |
| CA bundle file                | `mtlsCaCertificatePath`             | `CAMUNDA_MTLS_CA_PATH`               | `camunda.client.mtls.ca-path`               |
| CA bundle PEM                 | `mtlsCaCertificateContent`          | `CAMUNDA_MTLS_CA`                    | `camunda.client.mtls.ca`                    |
| Keystore file                 | `clientKeystore(path, …)`           | `CAMUNDA_MTLS_KEYSTORE_PATH`         | `camunda.client.mtls.keystore-path`         |
| Keystore password             | `clientKeystore(…, password, …)`    | `CAMUNDA_MTLS_KEYSTORE_PASSWORD`     | `camunda.client.mtls.keystore-password`     |
| Keystore key password         | `clientKeystore(…, keyPassword)`    | `CAMUNDA_MTLS_KEYSTORE_KEY_PASSWORD` | `camunda.client.mtls.keystore-key-password` |
| Truststore file               | `mtlsTruststore(path, …)`           | `CAMUNDA_MTLS_TRUSTSTORE_PATH`       | `camunda.client.mtls.truststore-path`       |
| Truststore password           | `mtlsTruststore(…, password)`       | `CAMUNDA_MTLS_TRUSTSTORE_PASSWORD`   | `camunda.client.mtls.truststore-password`   |

## Configuration errors

The client checks the mTLS configuration when you build it and throws an `IllegalArgumentException` if the configuration conflicts or is incomplete:

| Configuration                                                            | Fix                            |
| ------------------------------------------------------------------------ | ------------------------------ |
| Both PEM identity and a keystore are set                                 | Keep only one client identity. |
| Only the certificate or only the private key is set                      | Set both.                      |
| An mTLS CA bundle and an mTLS truststore are both set                    | Keep only one.                 |
| `caCertificatePath` is set together with an mTLS CA bundle or truststore | Keep only one.                 |
| mTLS settings are set, but both the gRPC and REST addresses use `http`   | Use `https` addresses.         |

The client never logs private keys, passphrases, or passwords, and doesn't include them in `toString()` output.
