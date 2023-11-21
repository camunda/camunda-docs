---
id: identity
title: "Identity"
description: "Read details on how to connect Web Modeler with Identity securely."
---

:::note
Web Modeler Self-Managed is available to [enterprise customers](../../../../reference/licenses.md#web-modeler) only.
:::

## Configuring secure connections to Identity

By default, communication between Web Modeler and Identity is not encrypted, as it usually happens backend-to-backend within the same [Docker](../../../platform-deployment/docker.md) network or [Kubernetes](../../../platform-deployment/helm-kubernetes/overview.md) cluster.
However, you can enable TLS-encrypted communication by following the steps below (for example, if backend-to-backend communication is not possible in a custom Camunda 8 installation setup).

### Configure the Identity base URL

Provide a URL that starts with `https://` (e.g. `https://identity.example.com`) as the base URL of the Identity instance:

- For the `modeler-webapp` container, provide the URL via the environment variable `IDENTITY_BASE_URL`.
- For the `modeler-restapi` container, provide the URL via the environment variable `RESTAPI_IDENTITY_BASE_URL`.

### (Optional) Provide a custom certificate

If you are using a custom (self-signed) TLS certificate for Identity, you need to make Web Modeler accept the certificate:

- For the `modeler-webapp` container, provide the path to the certificate file via the environment variable `NODE_EXTRA_CA_CERTS` (make sure that the provided path is accessible from the container, e.g. via a mounted volume):
  ```sh
  NODE_EXTRA_CA_CERTS=/path/to/certificate.crt
  ```
- For the `modeler-restapi` container:
  - Add the certificate to a custom Java trust store (using the [`keytool`](https://docs.oracle.com/en/java/javase/21/docs/specs/man/keytool.html) utility).
  - Configure the trust store as described in the [Zeebe connection troubleshooting guide](../troubleshooting/troubleshoot-zeebe-connection.md#provide-the-certificate-to-the-jvm-trust-store).
