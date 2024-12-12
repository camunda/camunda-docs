---
id: production-guide
title: "Helm Chart Production Guide"
sidebar_label: "Helm Chart Production Guide"
description: "Learn how to set up the helm chart in a production setting."
---

## Overview

The Base Production Setup provides a simplified and streamlined 3-pod deployment architecture for core Camunda 8 applications. This setup minimizes complexity while offering a reliable foundation for most production use cases.

## Architecture Overview

Below is the high-level architecture diagram for the base production setup _(click on the image to open the PDF version)_:
[![Infrastructure Diagram ROSA Single-Region](./assets/smarch.jpg)](./assets/smarch.pdf)

- Supported Components:
  Camunda Platform Core Applications: Zeebe, Tasklist, Operate
- Ingress Controller (e.g., Nginx)
- External Dependencies:
  PostgreSQL (for persistent data storage)
  Elasticsearch/OpenSearch (for indexing and analytics)
  Keycloak (for authentication/authorization)
- Other Notes:
  The Optimize importer requires to be in a separate pod.

## Step-by-Step Installation Guide

### TLS setup with your DNS (terminated at ingress)

In order to access the Camunda Platform through HTTPS ingress, you have to enable TLS. To do that, you must also specify a TLS secret. Here is an example values.yaml configuration:

```yaml
global:
  ingress:
    host: "camunda.example.com"
    tls:
      enabled: true
      secretName: camunda-platform
```

There is a separate ingress configuration for the core based on REST or GRPC:

Here is an example GRPC Ingress setup for the Core Camunda component.

```yaml
core:
  ingress:
    grpc:
      enabled: true
      className: nginx
      host: "zeebe-grpc.camunda.example.com"
      tls:
        enabled: true
        secretName: camunda-platform-core-grpc
```

Here is an example REST Ingress setup for the Core Camunda component.

```yaml
core:
  ingress:
    grpc:
      enabled: true
      className: nginx
      host: "zeebe-rest.camunda.example.com"
      tls:
        enabled: true
        secretName: camunda-platform-core-rest
```

Please refer to the [kuberntes documentation](https://kubernetes.io/docs/concepts/configuration/secret/#tls-secrets) on how to make a TLS secret

The certificate must be an X.509 certificate, issued by a trusted Certificate Authority.
Also, the certificate must include the correct domain names (Common Name or Subject Alternative Names) to secure ingress resources.
Please reach out to your DNS provider if you are unsure on how to create a TLS certificate. It is not recommended to use self-signed certificates.

For more information on Ingress setup, please refer to our [ingress setup guide](http://localhost:3000/docs/next/self-managed/setup/guides/ingress-setup/)

### Deploying with OpenID Connect Provider

Please refer to the following guides:

- [Connect to an OpenID Connect provider](http://localhost:3000/docs/next/self-managed/setup/guides/connect-to-an-oidc-provider/)
- Connect to existing Keycloak:
  - [Configuration of the Camunda Helm Chart](/docs/self-managed/setup/guides/using-existing-keycloak/)
  - [Configuration of Keycloak](/docs/next/self-managed/identity/user-guide/configuration/configure-external-identity-provider/)

### External Databases

To make it easy for testing, the Camunda Helm Chart provides external charts for Databases such as Elasticsearch and PostgresQL. Within a production setting, these dependency charts should be disabled and production databases should be used instead. For example, instead of the Elasticsearch dependency chart, elastic-cloud on GCP may be used, and instead of the PostgresQL dependency chart, you could use Amazon Aurora PostgreSQL.

We have a number of guides on connecting to external databases with the Camunda Helm Chart:

- [Using existing Elasticsearch](/docs/self-managed/setup/guides/using-existing-elasticsearch/)
- [Using Amazon OpenSearch Service](/docs/self-managed/setup/guides/using-existing-opensearch/)
  - [Using Amazon OpenSearch Service through IRSA (only applicable if you are running Camunda Platform on EKS)](/docs/self-managed/setup/deploy/amazon/amazon-eks/terraform-setup.md#opensearch-module-setup)
- [Running Web Modeler on Amazon Aurora PostgreSQL](/docs/self-managed/modeler/web-modeler/configuration/database/#running-web-modeler-on-amazon-aurora-postgresql)

### Upgrading the chart (disable secret generation on upgrades)

Make sure auto-generated secrets are mentioned by default in all relevant components.
