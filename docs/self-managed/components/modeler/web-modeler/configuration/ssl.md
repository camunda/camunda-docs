---
id: ssl
title: "SSL"
description: "Read details on additional SSL configuration for Web Modeler."
---

By default, communication between Web Modeler and Identity and the Web Modeler components is not encrypted, as it usually happens backend-to-backend within the same [Docker](/self-managed/setup/deploy/other/docker.md) network or [Kubernetes](/self-managed/setup/install.md) cluster.
However, you can enable TLS-encrypted communication by following the steps below (for example, if backend-to-backend communication is not possible in a custom Camunda 8 installation setup).

## Configuring secure connections to Identity

### Configure the Identity base URL

Provide a URL that starts with `https://` (e.g. `https://identity.example.com`) as the base URL of the Identity instance:

- For the `modeler-webapp` container, provide the URL via the environment variable `IDENTITY_BASE_URL`.
- For the `modeler-restapi` container, provide the URL via the environment variable `RESTAPI_IDENTITY_BASE_URL`.

## Configuring secure connections between Web Modeler components

### Configure `restapi` SSL certificate

SSL can be configured declaratively by setting the respective properties offered by Spring Boot, e.g. (make sure that the provided certificate path is accessible from the container, e.g. via a mounted volume):

```
RESTAPI_SERVER_URL=https://web-modeler.example.com

SERVER_SSL_ENABLED=true
SERVER_SSL_CERTIFICATE=file:/full/path/to/certificate.pem
SERVER_SSL_CERTIFICATE_PRIVATE_KEY=file:/full/path/to/key.pem
```

Additionally, you can configure SSL separately for the management routes of the `restapi` component:

```
MANAGEMENT_SERVER_SSL_ENABLED=true
MANAGEMENT_SERVER_SSL_CERTIFICATE=file:/full/path/to/certificate.pem
MANAGEMENT_SERVER_SSL_CERTIFICATE_PRIVATE_KEY=file:/full/path/to/key.pem
```

Refer to the [Spring Boot documentation](https://docs.spring.io/spring-boot/how-to/webserver.html#howto.webserver.configure-ssl) for more information on configuration options.

#### Use secure connections between the `restapi` and `websocket` components

To use secure connections between the `restapi` and `websocket` components, provide the following environment variable:

```
RESTAPI_PUSHER_SSL_ENABLED=true
```

### Configure `webapp` SSL certificate

To configure SSL for the `webapp` component, provide the following environment variables (make sure that the provided certificate path is accessible from the container, e.g. via a mounted volume):

```
SERVER_URL=https://web-modeler.example.com

SSL_ENABLED=true
SSL_CERT=/full/path/to/certificate.pem
SSL_KEY=/full/path/to/key.pem
SSL_PASSPHRASE=your-passphrase
```

Additionally, you can configure SSL separately for the management routes of the `webapp` component:

```
MANAGEMENT_SSL_ENABLED=true
MANAGEMENT_SSL_CERT=/full/path/to/certificate.pem
MANAGEMENT_SSL_KEY=/full/path/to/key.pem
MANAGEMENT_SSL_PASSPHRASE=your-passphrase
```

#### Use secure connections between the `webapp` and `restapi` components

To use secure connections between the `webapp` and `restapi` components, provide the following environment variable:

```
RESTAPI_SSL_ENABLED=true
RESTAPI_MANAGEMENT_SSL_ENABLED=true
```

### Configure `websocket` SSL certificate

SSL can be configured by setting the following environment variables (make sure that the provided certificate path is accessible from the container, e.g. via a mounted volume):

```
PUSHER_SSL_CERT=/full/path/to/certificate.pem
PUSHER_SSL_KEY=/full/path/to/key.pem
PUSHER_SSL_PASSPHRASE=your-passphrase
```

:::info

Currently, there is no option to configure SSL for the `websocket` management routes separately from the application routes.

:::

## (Optional) Provide a custom certificate

If you are using a custom (self-signed) TLS certificate for either `restapi`, `webapp` or Identity, you need to make Web Modeler accept the certificate:

- For the `modeler-webapp` container, provide the path to the certificate file via the environment variable `NODE_EXTRA_CA_CERTS` (make sure that the provided path is accessible from the container, e.g. via a mounted volume):
  ```sh
  NODE_EXTRA_CA_CERTS=/path/to/certificate.crt
  ```
- For the `modeler-restapi` container:
  - Add the certificate to a custom Java trust store (using the [`keytool`](https://docs.oracle.com/en/java/javase/21/docs/specs/man/keytool.html) utility).
  - Configure the trust store as described in the [Zeebe connection troubleshooting guide](../troubleshooting/troubleshoot-zeebe-connection.md#provide-the-certificate-to-the-jvm-trust-store).
