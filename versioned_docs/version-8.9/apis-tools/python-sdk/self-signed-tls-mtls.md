---
id: self-signed-tls-mtls
title: Self-signed TLS / mTLS
sidebar_label: Self-signed TLS / mTLS
sidebar_position: 8
mdx:
  format: md
---

# Self-signed TLS / mTLS

The SDK supports custom TLS certificates via environment variables. This is useful for:

- **Self-signed server certificates** — trust a CA that signed your server's certificate, without presenting a client identity.
- **Mutual TLS (mTLS)** — present a client certificate and key to prove the client's identity.
- **Both** — trust a custom CA _and_ present client credentials.

## Trusting a self-signed server certificate

Set only the CA certificate to trust the server's self-signed certificate:

```bash
# Path to PEM file:
CAMUNDA_MTLS_CA_PATH=/path/to/ca.pem

# Or inline PEM:
CAMUNDA_MTLS_CA="-----BEGIN CERTIFICATE-----\n..."
```

## Mutual TLS (client certificate)

To present a client certificate for mutual TLS, provide both the certificate and private key:

```bash
CAMUNDA_MTLS_CERT_PATH=/path/to/client.crt
CAMUNDA_MTLS_KEY_PATH=/path/to/client.key

# Optional — passphrase if the key is encrypted:
# CAMUNDA_MTLS_KEY_PASSPHRASE=secret
```

## Full mTLS with custom CA

Combine a custom CA with client credentials:

```bash
CAMUNDA_MTLS_CA_PATH=/path/to/ca.pem
CAMUNDA_MTLS_CERT_PATH=/path/to/client.crt
CAMUNDA_MTLS_KEY_PATH=/path/to/client.key
```

Inline PEM values (`CAMUNDA_MTLS_CERT`, `CAMUNDA_MTLS_KEY`, `CAMUNDA_MTLS_CA`) take precedence over their `_PATH` counterparts.

No code changes are needed — the SDK picks up TLS configuration from environment variables automatically:

<!-- snippet-exempt: trivial env-var usage illustration -->

```python
from camunda_orchestration_sdk import CamundaClient

client = CamundaClient()  # TLS configured from env vars
```
