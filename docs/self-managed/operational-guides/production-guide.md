---
id: production-guide
title: "Helm Chart Production Guide"
sidebar_label: "Helm Chart Production Guide"
description: "Learn how to set up the helm chart in a production setting."
---

## Overview

This guide provides a simplified and streamlined 3-pod deployment architecture for core Camunda 8 applications using the Camunda Helm Chart. This setup minimizes complexity while offering a reliable foundation for most production use cases.

The goal of this guide is to give you a **scenario-based, production focused, step-by-step guide** for setting up the Camunda Helm Chart. By following this guide, you should be thoroughly familiar with all of the necessary requirements for having a production ready Camunda Helm Chart.

## Prerequisites

Before proceeding with the setup, ensure the following requirements are met:

- **Kubernetes Cluster**: A functioning Kubernetes cluster with kubectl access.
- **Helm**: Helm CLI installed
- **DNS Configuration**: Access to configure DNS for your domain to point to the Kubernetes cluster ingress.
- **TLS Certificates**: Obtain valid X.509 certificates for your domain from a trusted Certificate Authority.
- **External Dependencies**: Provision the following external dependencies:
  - **Amazon Aurora PostgreSQL**: For persistent data storage.
  - **Amazon OpenSearch**: For indexing and analytics.
  - **Azure Active Directory**: For authentication and authorization.
- **NGINX Ingress Controller**: Ensure the NGINX ingress controller is set up in the cluster.
- **Persistent Volumes**: Configure block storage persistent volumes for stateful components.
- **Namespace Configuration**: Plan and create namespaces with appropriate resource quotas and LimitRanges for the Camunda Helm Chart.
- **Resource Planning**: Evaluate sufficient CPU, memory, and storage necessary for the deployment. Have a look at our [sizing guide](/docs/next/components/best-practices/architecture/sizing-your-environment/#camunda-8-self-managed) for more information.
  <!-- - **Network and Security Policies**: -->
  <!--   - Enable and configure network policies to restrict pod communication. -->
  <!--   - Apply Pod Security Policies or Pod Security Standards (if supported by your cluster). -->
  <!-- - **Service Account**: Create a dedicated ServiceAccount for Camunda applications with limited permissions. -->

Ensure all prerequisites are in place to avoid issues during installation or scaling in a production environment.

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

# Step-by-Step Production Guide

## Installation and Configuration

#### Namespace Setup

To get started, create two namespace:

```bash
kubectl create namespace management
kubectl create namespace orchestration
```

Within the `management` namespace, we will install Identity, Console, and all the Web Modeler components, . Within the `orchestration` namespace, we will install the Camunda Orchestration Core componennt, along with Connectors and Optimize importer. We do not have to worry about installing each component separately since that will be handled by the Helm Chart automatically.

#### Installing the Helm Chart

The Camunda Helm Chart can be installed using the following command:

```bash
# This will install the latest Camunda Helm chart with the latest applications/dependencies.
helm install camunda camunda/camunda-platform \
    --values production-values.yaml
```

The following secionts will help you fill out the content for `production-values.yaml`:

### Ingress TLS and Hostname setup for HTTPS Connections

In order to access the Camunda Platform through HTTPS with ingress, you have to enable TLS. To do that, you require three things:

1. A public registered domain that has configurable DNS records. In our example we will use `camunda.example.com` as the domain.
2. A TLS certificate created from your domain. The certificate must be an X.509 certificate, issued by a trusted Certificate Authority. Also, the certificate must include the correct domain names (Common Name or Subject Alternative Names) to secure ingress resources. Please reach out to your DNS provider if you are unsure on how to create a TLS certificate. It is not recommended to use self-signed certificates.
3. A TLS secret created from your TLS certificate. In our example, we will use a secret called `camunda-platform`. Please refer to the [kuberntes documentation](https://kubernetes.io/docs/concepts/configuration/secret/#tls-secrets) on how to make a TLS secret

Here is an example values.yaml configuration using the domain and TLS secret mentioned above:

```yaml
global:
  ingress:
    enabled: true
    className: nginx
    host: "camunda.example.com"
    tls:
      enabled: true
      secretName: camunda-platform
```

Optionally, there is a separate ingress configuration for the core, based on GRPC. Here is an example GRPC Ingress setup for the Core Camunda component:

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

For more information on the Ingress setup, please refer to our [ingress setup guide](http://localhost:3000/docs/next/self-managed/setup/guides/ingress-setup/)

### Integrate with an Identity Provider (Azure Active Directory)

Once secure HTTPS connections are enabled and correctly configured via Ingress, the next stage to consider is configuring authentication. In this example, we will use Azure Active Directory. Here is an example configuration to add to your `production-values.yaml` file:

```yaml
global:
  identity:
    auth:
      type: "MICROSOFT"
      issuer: "https://login.microsoftonline.com/00000000-0000-0000-0000-000000000000/v2.0"
      issuerBackendUrl: "https://login.microsoftonline.com/00000000-0000-0000-0000-000000000000/v2.0"
      tokenUrl: "https://login.microsoftonline.com/00000000-0000-0000-0000-000000000000/oauth2/v2.0/token"
      jwksUrl: "https://login.microsoftonline.com/00000000-0000-0000-0000-000000000000/discovery/v2.0/keys"
      identity:
        clientId: "00000000-0000-0000-0000-000000000000"
        existingSecret: "password-string-literal"
        audience: "00000000-0000-0000-0000-000000000000"
        redirectUrl: "https://identity.camunda.example.com"
        initialClaimName: "email"
        initialClaimValue: test.user@camunda.com
      optimize:
        clientId: "00000000-0000-0000-0000-000000000000"
        existingSecret: "password-string-literal"
        audience: "00000000-0000-0000-0000-000000000000"
        redirectUrl: "https://optimize.camunda.example.com"
      core:
        clientId: "00000000-0000-0000-0000-000000000000"
        existingSecret: "password-string-literal"
        audience: "00000000-0000-0000-0000-000000000000"
        tokenScope: "00000000-0000-0000-0000-000000000000/.default"
        redirectUrl: "https://core.camunda.example.com"
      console:
        clientId: "00000000-0000-0000-0000-000000000000"
        wellKnown: https://login.microsoftonline.com/00000000-0000-0000-0000-000000000000/v2.0/.well-known/openid-configuration
        audience: "00000000-0000-0000-0000-000000000000"
        existingSecret: "password-string-literal"
        redirectUrl: "https://console.camunda.example.com"
      webModeler:
        clientId: "00000000-0000-0000-0000-000000000000"
        clientApiAudience: "00000000-0000-0000-0000-000000000000"
        publicApiAudience: "00000000-0000-0000-0000-000000000000"
        redirectUrl: "https://modeler.camunda.example.com"
```

If you would like some more guidance relating to authentication, then please refer to the following guides:

- [Connect to an OpenID Connect provider](http://localhost:3000/docs/next/self-managed/setup/guides/connect-to-an-oidc-provider/)

### Connect External Databases

The next stage of the production setup is configuring databases. To make it easy for testing, the Camunda Helm Chart provides external, dependency Helm Charts for Databases such as Bitnami Elasticsearch Helm Chart and Bitnami PostgresQL Helm Chart. Within a production setting, these dependency charts should be disabled and production databases should be used instead. For example, instead of the Bitnami Elasticsearch dependency chart, we will use Amazon OpenSearch, and instead of the Bitnami PostgreSQL dependency chart, we will use Amazon Aurora PostgreSQL.

In our scenario the Core component, and the Optimize importer communicates with a singular Amazon OpenSearch instance. On the other hand, the identity and web-modeler component are connected to seperate Amazon Aurora PostgreSQL instances.

It is assumed that you already have one Amazon OpenSearch instance and two Amazon Aurora PostgreSQL instances setup and ready to go with a username, password, and URL.

#### Connecting to Amazon OpenSearch:

```yaml
global:
  elasticsearch:
    enabled: false
  opensearch:
    enabled: true
    auth:
      username: user
      password: pass
    url:
      protocol: https
      host: opensearch.example.com
      port: 443

elasticsearch:
  enabled: false
```

You can see that we have globally disabled all internal component configuration for Elasticsearch through `global.elasticsearch.enabled: false` and also disable internal Elasticsearch through `elasticsearch.enabled: false`.

#### Connecting to Amazon Aurora PostgreSQL for Identity:

Here is how to configure Identity with external Amazon Aurora PostgreSQL:

```yaml
Placeholder for external postgresql connection for identity.
```

#### Connecting to Amazon Aurora PostgreSQL for Web Modeler:

Here is how to configure Web Modeler with external Amazon Aurora PostgreSQL:

```yaml
Placeholder for external postgresql connection for web-modeler.
```

Please make sure to correctly define the protocol, host, and port.

If you would like further information on connecting to external databases, we have a number of guides on doing so with the Camunda Helm Chart:

- [Using existing Elasticsearch](/docs/self-managed/setup/guides/using-existing-elasticsearch/)
- [Using Amazon OpenSearch Service](/docs/self-managed/setup/guides/using-existing-opensearch/)
  - [Using Amazon OpenSearch Service through IRSA (only applicable if you are running Camunda Platform on EKS)](/docs/self-managed/setup/deploy/amazon/amazon-eks/terraform-setup.md#opensearch-module-setup)
- [Running Web Modeler on Amazon Aurora PostgreSQL](/docs/self-managed/modeler/web-modeler/configuration/database/#running-web-modeler-on-amazon-aurora-postgresql)

## Application-Specific Configurations

At this point you are able to connect to your platform through HTTPS, correctly authenticate users using Azure Active Directory, and have connected to external databases such as Amazon OpenSearch and Amazon PostgreSQL. The logical next step is to focus on the Camunda application-specific configurations suitable for a production environment:

- Amazon OpenSearch configuration for the core component:

### Enabling Index Lifecycle Management (ILM) Policies for Amazon OpenSearch

- It is important to have Index Lifecycle Management for Amazon OpenSearch. Here is an example:
- Retention time is a setting in the helm chart with default values from the SaaS setup.

```yaml
[
  placeholder for configuring OpenSearch lifecycle policies on the core component,
]
```

### Configuring Backups for Camunda Components

- Optimize: disable ObjectVariable import by default (save space in OpenSearch). Add a setting to enable it explicitly on demand.

## Scaling and Performance

Here are some points to keep in mind when considering scalability:

- To scale the Core component, the following values can be modified:

```yaml
core:
  clusterSize: "3"
  partitionCount: "3"
  replicationFactor: "3"
```

The `core.clusterSize` refers to the amount of borkers, the `core.partitionCount` refers to how each [partition](/docs/components/zeebe/technical-concepts/partitions/) is setup in the cluster, and the `core.replicationFactor` refers to the [number of nodes](/docs/components/zeebe/technical-concepts/partitions/#replication).

:::note
The `core.partitionCount` does not support dynamic scaling. You will not be able to modify it on future upgrades.
:::

- Check the resource (CPU and memory) limits set and make sure they are reasonable. For example, the resource limits can be changed for the core component by modifying the following values:

```yaml
core:
  resources:
    requests:
      cpu: 800m
      memory: 1200Mi
    limits:
      cpu: 2000m
      memory: 1920Mi
```

- It is possible to set a LimitRange on the namespace. Please refer to the [Kubernetes documentation](https://kubernetes.io/docs/tasks/administer-cluster/manage-resources/memory-default-namespace/) on setting a LimitRange.

## Reliability Best Practices

Here are some points to keep in mind when considering reliability:

- Check node affinity and tolerations.
- It is possible to set a `podDisruptionBudget`. For example you can modify the following values for the Core component:

```yaml
core:
  podDisruptionBudget:
    enabled: false
    minAvailable: 0
    maxUnavailable: 1
```

- Version Management: Stay on a stable Camunda and Kubernetes version and follow Camunda’s release notes for security patches or critical updates.
- Secrets should be created prior to installing the helm chart so they can be referenced as existingSecrets when installing the helm chart.
- Familiar with upgrades. Ideally, customers should have already performed an upgrade in the lower environment before going to production.
- Containers do not store any state in their local filesystem. State should be stored in PVs
- Mount Secrets as volumes, not enviroment variables
- Always asses the kubernetes object version and be weary of alpha or beta versions.
- Namespaces have ResourceQuotas

## Security Guidelines

Here are some points to keep in mind when considering security:

- Disable auto-mounting of the default ServiceAccount
- ServiceAccount tokens are for applications and controllers only. End users should not be given these tokens
- Enable network policies
- Maybe link this to customer: https://github.com/ahmetb/kubernetes-network-policy-recipes
- Enable Pod Security Policies
- Use read-only root filesystem
- Disable privelaged containers
- Only allow deploying containers only from known registries: https://blog.openpolicyagent.org/securing-the-kubernetes-api-with-open-policy-agent-ce93af0552c3#3c6e
- Use approved domain names for the ingress hostname: https://www.openpolicyagent.org/docs/latest/kubernetes-tutorial/#4-define-a-policy-and-load-it-into-opa-via-kubernetes

## Observability and Monitoring

Here are some points to keep in mind when considering observability:

- Setup observability with Prometheus and Grafana
- Nice to have a retention and archival strategy for logs
- Have a log aggregation tool.
- Audit logs: Enable audit logging for Camunda components to track user actions, especially for sensitive data or configuration changes.

## Bringing it All Together

Here is the full and complete values.yaml consider all the above topics.

```yaml
[placeholder for the yaml]
(make sure to the values.yaml in a multinamespace setting and configure console likewise)
```

## Other Concepts to take note of

### Upgrade and Maintenance

Make sure auto-generated secrets are mentioned by default in all relevant components.

### Adding more Orchestration clusters

The next recommended step is to setup a multi-namespace deployemnt. A [guide](/docs/self-managed/setup/guides/multi-namespace-deployment/) for this is already available. This is the most recommended approach to allow you to setup various environments using the Camunda Orchestration Cluster.

### Running benchmarks

If you would like to run benchmarks on the platform then please refer to our [community project](https://github.com/camunda-community-hub/camunda-8-benchmark)
