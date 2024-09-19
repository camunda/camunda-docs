---
id: ssl
title: "SSL"
description: "Read details on additional SSL configuration for Console."
---

By default, communication between Console and Identity and other components is not encrypted, as it usually happens backend-to-backend within the same [Docker](/self-managed/setup/deploy/other/docker.md) network or [Kubernetes](/self-managed/setup/install.md) cluster.
However, you can enable TLS-encrypted communication by following the steps below (for example, if backend-to-backend communication is not possible in a custom Camunda 8 installation setup).

## Configuring secure connections to Identity

### Configure the Identity base URL

Provide a URL that starts with `https://` (e.g. `https://identity.example.com`) as the base URL of the Identity instance:

Provide the URL via the environment variable `KEYCLOAK_BASE_URL` and `KEYCLOAK_INTERNAL_BASE_URL`.

## Configuring secure connections to Console

### Configure SSL certificate

SSL can be configured declaratively by setting the respective properties, e.g. (make sure that the provided certificate path is accessible from the container, e.g. via a mounted volume):

```
SERVER_SSL_ENABLED=true
SERVER_SSL_CERTIFICATE=file:/full/path/to/certificate.pem
SERVER_SSL_CERTIFICATE_PRIVATE_KEY=file:/full/path/to/key.pem
SERVER_SSL_PASSPHRASE=passphrase (optional)
```

Additionally, you can configure SSL separately for the management routes:

```
MANAGEMENT_SERVER_SSL_ENABLED=true
MANAGEMENT_SERVER_SSL_CERTIFICATE=file:/full/path/to/certificate.pem
MANAGEMENT_SERVER_SSL_CERTIFICATE_PRIVATE_KEY=file:/full/path/to/key.pem
MANAGEMENT_SERVER_SSL_PASSPHRASE=passphrase (optional)
```

## (Optional) Provide a custom certificate

If you are using a custom (self-signed) TLS certificate Console or Identity, you need to make Console accept the certificate:

Provide the path to the certificate file via the environment variable `NODE_EXTRA_CA_CERTS` (make sure that the provided path is accessible from the container, e.g. via a mounted volume):

```sh
NODE_EXTRA_CA_CERTS=/path/to/certificate.crt
```
