---
id: tls-and-mutual-tls
title: "TLS and mutual TLS"
sidebar_label: "TLS and mutual TLS"
sidebar_position: 8
mdx:
  format: md
---

# TLS and mutual TLS

:::caution Technical Preview
The Go SDK is a **technical preview**. Its API surface may still evolve and changes may not follow semantic versioning. Pin an exact version if you need stability.
:::

TLS is derived from the scheme of `CAMUNDA_REST_ADDRESS`. Mutual TLS and custom
certificate authorities — for a Self-Managed cluster behind a private CA, or one
requiring client certificates — are configured by environment variable. Inline
PEM values take precedence over the corresponding `*_PATH` file locations.

| Variable                      | Description                                                                                                    |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `CAMUNDA_MTLS_CERT`           | Inline client certificate PEM.                                                                                 |
| `CAMUNDA_MTLS_KEY`            | Inline client private key PEM.                                                                                 |
| `CAMUNDA_MTLS_CA`             | Inline CA certificate PEM for verifying the server.                                                            |
| `CAMUNDA_MTLS_CERT_PATH`      | Path to the client certificate PEM.                                                                            |
| `CAMUNDA_MTLS_KEY_PATH`       | Path to the client private key PEM.                                                                            |
| `CAMUNDA_MTLS_CA_PATH`        | Path to the CA certificate PEM.                                                                                |
| `CAMUNDA_MTLS_KEY_PASSPHRASE` | Recognised but **not supported yet** — setting it fails client construction. Supply an unencrypted client key. |

The same material is applied to both the REST transport and the gRPC streaming
worker, so a single configuration covers every connection the SDK opens.
