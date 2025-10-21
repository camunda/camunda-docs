---
id: ssl
title: "Console SSL configuration"
sidebar_label: "SSL"
description: "Read details on additional SSL configuration for Console."
---

By default, communication between Console, Identity, and other components is not encrypted, as it usually occurs backend-to-backend within the same [Docker](/self-managed/deployment/docker/docker.md) network or [Kubernetes](/self-managed/deployment/helm/install/quick-install.md) cluster.

TLS-encrypted communication can be enabled by following the steps below (for example, if backend-to-backend communication is not possible in a custom Camunda 8 installation setup).

## Configure Console for secure connections

Console can be configured using [environment variables](/self-managed/components/console/configuration/configuration.md#environment-variables) to enable secure connections to both Console and Identity.

### Configure the Identity base URL

Set the base URL (starting with `https://`) of your Identity instance using the following properties:

| Environment variable         | Example value                  |
| ---------------------------- | ------------------------------ |
| `KEYCLOAK_BASE_URL`          | `https://identity.example.com` |
| `KEYCLOAK_INTERNAL_BASE_URL` | `https://identity.example.com` |

### Configure SSL certificate

Enable and configure SSL by setting the following properties:

| Environment variable                 | Description                                                                                                                                                        | Example value                        |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------ |
| `SERVER_SSL_ENABLED`                 | To enable SSL, set to `true`.                                                                                                                                      | `true`                               |
| `SERVER_SSL_CERTIFICATE`             | The path to a PEM-encoded SSL certificate file. Ensure the provided path is accessible from the container (for example, via a mounted volume).                     | `file:/full/path/to/certificate.pem` |
| `SERVER_SSL_CERTIFICATE_PRIVATE_KEY` | The path to a PEM-encoded private key file for the SSL certificate. Ensure the provided path is accessible from the container (for example, via a mounted volume). | `file:/full/path/to/key.pem`         |
| `SERVER_SSL_PASSPHRASE`              | _Optional_ A passphrase for the private key.                                                                                                                       | `passphrase`                         |

SSL can be configured separately for the management routes using the `MANAGEMENT_` properties:

| Environment variable                            | Description                                                                                                                                                        | Example value                        |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------ |
| `MANAGEMENT_SERVER_SSL_ENABLED`                 | To enable SSL, set to `true`.                                                                                                                                      | `true`                               |
| `MANAGEMENT_SERVER_SSL_CERTIFICATE`             | The path to a PEM-encoded SSL certificate file. Ensure the provided path is accessible from the container (for example, via a mounted volume).                     | `file:/full/path/to/certificate.pem` |
| `MANAGEMENT_SERVER_SSL_CERTIFICATE_PRIVATE_KEY` | The path to a PEM-encoded private key file for the SSL certificate. Ensure the provided path is accessible from the container (for example, via a mounted volume). | `file:/full/path/to/key.pem`         |
| `MANAGEMENT_SERVER_SSL_PASSPHRASE`              | _Optional_ A passphrase for the private key.                                                                                                                       | `passphrase`                         |

## (Optional) Provide a custom certificate

If you are using a custom (self-signed) TLS certificate in Console or Identity, configure Console to accept the certificate.

Create a secret with the value of the key being the filename:

```bash
kubectl create secret generic consoletls --from-file=console.crt=console.crt
```

Once the secret is created, it can be used in the values.yaml:

```yaml
console:
  tls:
    enabled: true
    existingSecret: consoletls
    certKeyFilename: console.crt
```
