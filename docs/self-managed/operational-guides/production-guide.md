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

### TLS setup with your DNS hostname (terminated at ingress)

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
    rest:
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

For more information on the Ingress setup, please refer to our [ingress setup guide](http://localhost:3000/docs/next/self-managed/setup/guides/ingress-setup/)

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

### Multi-namespace Deployment

The next recommended step is to setup a multi-namespace deployemnt. A [guide](/docs/self-managed/setup/guides/multi-namespace-deployment/) for this is already available. This is the most recommended approach to allow you to setup various environments using the Camunda Orchestration Cluster.

### Scalability

Here are some points to keep in mind when considering scalability:

- To scale the Core component, the following values can be modified:

```yaml
core:
  clusterSize: "3"
  partitionCount: "3"
  replicationFactor: "3"
```

The `core.clusterSize` refers to the amount of borkers, the `core.partitionCount` refers to how each [partition](/docs/components/zeebe/technical-concepts/partitions/) is setup in the cluster, and the `core.replicationFactor` refers to the [number of nodes](/docs/components/zeebe/technical-concepts/partitions/#replication).

- Check the resource (CPU and memory) limits set and make sure they are reasonable. We recommend to disable the CPU limits unless you have a good usecase. For example, the resource limits can be changed for the core component by modifying the following values:

```yaml
core:
  resources:
    requests:
      cpu: 800m
      memory: 1200Mi
    limits:
      cpu: null
      memory: 1920Mi
```

- If you would like to run benchmarks on the platform then please refer to our [community project](https://github.com/camunda-community-hub/camunda-8-benchmark)
- It is possible to set a `podDisruptionBudget`. For example you can modify the following values for the Core component:

```yaml
core:
  podDisruptionBudget:
    enabled: false
    minAvailable: null
    maxUnavailable: 1
```

- It is possible to set a LimitRange on the namespace. Please refer to the [Kubernetes documentation](https://kubernetes.io/docs/tasks/administer-cluster/manage-resources/memory-default-namespace/) on setting a LimitRange.
- Use horizontal pod autoscaler where appropriate
- Use Vertical pod autoscaler where appropriate

### Reliability

Here are some points to keep in mind when consider reliability:

- Check node affinity and tolerations.
- Version Management: Stay on a stable Camunda and Kubernetes version and follow Camunda’s release notes for security patches or critical updates.
- Secrets should be created prior to installing the helm chart so they can be referenced as existingSecrets when installing the helm chart.
- Familiar with upgrades. Ideally, customers should have already performed an upgrade in the lower environment before going to production.
- Containers do not store any state in their local filesystem. State should be stored in PVs
- Mount Secrets as volumes, not enviroment variables
- Always asses the kubernetes object version and be weary of alpha or beta versions.
- Namespaces have ResourceQuotas

### Security

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

### Observability

Here are some points to keep in mind when considering observability:

- Setup observability with Prometheus and Grafana
- Nice to have a retention and archival strategy for logs
- Have a log aggregation tool.
- Audit logs: Enable audit logging for Camunda components to track user actions, especially for sensitive data or configuration changes.

### Component settings

- Tasklist, Operate, and Optimize should have cleanup enabled (Index Lifecycle Management?)
- ILM policies could be set for Elasticsearch and ISM policies for OpenSearch
- Retention time is a setting in the helm chart with default values from the SaaS setup.
- Optimize: disable ObjectVariable import by default (save space in Elasticsearch). Add a setting to enable it explicitly on demand.
- In general, the SaaS setup should be considered for the component settings.
- Elasticsearch performance tuning

### Upgrading the chart (disable secret generation on upgrades)

Make sure auto-generated secrets are mentioned by default in all relevant components.
