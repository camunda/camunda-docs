---
id: production-guide
title: "Helm Chart Production Guide"
sidebar_label: "Helm Chart Production Guide"
description: "Learn how to set up the helm chart in a production setting."
---

## Overview

This guide provides a simplified and streamlined architecture for core Camunda 8 applications using the Camunda Helm Chart. This setup minimizes complexity while offering a reliable foundation for most production use cases.

The goal of this guide is to give you a **scenario-based, production focused, step-by-step guide** for setting up the Camunda Helm Chart. By following this guide, you will be familiar with all of the necessary requirements for having a production ready Camunda Helm Chart.

## Prerequisites

Before proceeding with the setup, ensure the following requirements are met:

- **Kubernetes Cluster**: A functioning Kubernetes cluster with kubectl access.
- **Helm**: Helm CLI installed
- **DNS Configuration**: Access to configure DNS for your domain to point to the Kubernetes cluster ingress.
- **TLS Certificates**: Obtain valid X.509 certificates for your domain from a trusted Certificate Authority.
- **External Dependencies**: Provision the following external dependencies:
  - **Amazon Aurora PostgreSQL**: For persistent data storage required for the Web Modeler component.
  - **Amazon OpenSearch**: For indexing and analytics.
  - **AWS Simple Active Directory**: For authentication and authorization.
- **NGINX Ingress Controller**: Ensure the NGINX ingress controller is set up in the cluster.
- **AWS OpenSearch Snapshot Repository** - This will be a place to store the backups of the Camunda cluster. This repository must be configured with OpenSearch to take backups.
- **s3 Bucket** - This will be used to store backups of the Camunda cluster. This s3 bucket must be configured with OpenSearch to take backups.
- **Persistent Volumes**: Configure block storage persistent volumes for stateful components.
- **Namespace Configuration**: Plan and create namespaces with appropriate resource quotas and LimitRanges for the Camunda Helm Chart.
- **Resource Planning**: Evaluate sufficient CPU, memory, and storage necessary for the deployment. Have a look at our [sizing guide](/components/best-practices/architecture/sizing-your-environment.md/#camunda-8-self-managed) for more information.

Ensure all prerequisites are in place to avoid issues during installation or upgrading in a production environment.

## Architecture Overview

Below is the high-level architecture diagram for the base production setup _(click on the image to open the PDF version)_:
[![Infrastructure Diagram ROSA Single-Region](./assets/smarch.jpg)](./assets/smarch.pdf)

- Supported Components:
  Camunda Platform Core Components: Zeebe, Tasklist, Operate, Optimize
- Ingress Controller (e.g., Nginx)
- External Dependencies:
  - PostgreSQL (for persistent data storage)
  - AWS OpenSearch (for indexing and analytics)
  - Keycloak (for authentication/authorization)

# Step-by-Step Production Guide

## Installation and Configuration

#### Namespace Setup

To get started, create two namespace:

```bash
kubectl create namespace management
kubectl create namespace orchestration
```

Within the `management` namespace, we will install Identity, Console, and all the Web Modeler components. Within the `orchestration` namespace, we will install the Camunda Orchestration Core component, along with Connectors and Optimize importer. We do not have to worry about installing each component separately since that will be handled by the Helm Chart automatically.

#### Installing the Helm Chart

The Camunda Helm Chart can be installed using the following command:

```bash
# This will install the latest Camunda Helm chart with the latest applications/dependencies.
helm install camunda camunda/camunda-platform \
    --values production-values.yaml
```

The next section will explain various configurations used in `production-values.yaml``

### Ingress TLS Setup

In order to access the Camunda Platform through HTTPS with ingress, you have to enable TLS. To do that, you require three things:

1. A public registered domain that has configurable DNS records. In our example we will use `camunda.example.com` as the domain.
2. A TLS certificate created for your domain. The certificate must be an X.509 certificate, issued by a trusted Certificate Authority. Also, the certificate must include the correct domain names (Common Name or Subject Alternative Names) to secure ingress resources. Please reach out to your DNS provider if you are unsure on how to create a TLS certificate. It is not recommended to use self-signed certificates.
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

Optionally, you can configure ingress for Zeebe GRP endpoints. Here is an example Zeebe GRPC Ingress setup:

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

For more information on the Ingress setup, please refer to our [ingress setup guide](/self-managed/setup/guides/ingress-setup.md)

### Identity Provider Integration:

Once secure HTTPS connections are enabled and correctly configured via Ingress, the next stage to consider is configuring authentication. In this example, we will use AWS Simple Active Directory. Here is an example configuration to add to your `production-values.yaml` file:

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

- [Connect to an OpenID Connect provider](/self-managed/setup/guides/connect-to-an-oidc-provider.md)

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

#### Connecting to External Database for Identity:

Here is how to configure Identity with external Amazon Aurora PostgreSQL:

```yaml
identity:
  externalDatabase:
    enabled: true
    host: "external-postgres-host"
    port: 5432
    username: "identity_user"
    database: "identity_db"
    existingSecret: "identity-db-secret"
    existingSecretPasswordKey: "database-password"
```

Please make sure to correctly define the protocol, host, and port.

#### Connecting to External Database for Web Modeler:

Here is how to configure Web Modeler with external Amazon Aurora PostgreSQL:

```yaml
webModeler:
  externalDatabase:
    url: "jdbc:postgresql://external-postgres-host:5432/camunda_db"
    user: "camunda_user"
    password: "secure_password"
    existingSecret: "camunda-db-secret"
    existingSecretPasswordKey: "database-password"
```

The `existingSecret` can be used to specify an existing Kubernetes secret with the password.

If you would like further information on connecting to external databases, we have a number of guides on doing so with the Camunda Helm Chart:

- [Using existing Elasticsearch](/self-managed/setup/guides/using-existing-elasticsearch.md)
- [Using Amazon OpenSearch Service](/self-managed/setup/guides/using-existing-opensearch.md)
  - [Using Amazon OpenSearch Service through IRSA (only applicable if you are running Camunda Platform on EKS)](/self-managed/setup/deploy/amazon/amazon-eks/terraform-setup.md#opensearch-module-setup)
- [Running Web Modeler on Amazon Aurora PostgreSQL](/self-managed/modeler/web-modeler/configuration/database.md/#running-web-modeler-on-amazon-aurora-postgresql)

## Application-Specific Configurations

At this point you are able to connect to your platform through HTTPS, correctly authenticate users using AWS Simple Active Directory, and have connected to external databases such as Amazon OpenSearch and Amazon PostgreSQL. The logical next step is to focus on the Camunda application-specific configurations suitable for a production environment.

We will continue our journey in adding to the `production-values.yaml`. Here is what you should consider for Camunda component level configurations:

### Index Retention

An index lifecycle management (ILM) policy in OpenSearch is crucial for efficient management and operation of large-scale search and analytics workloads. ILM policies provide a framework for automating the management of index lifecycles, which directly impacts performance, cost efficiency, and data retention compliance.

Here is how the ILM policy can be configured for the core component. This can be added to your `production-values.yaml`:

```yaml
core:
  retention:
    enabled: true
    minimumAge: 30d
    policyName: core-record-retention-policy
```

If you would like more information on configuring ILM policy. Please refer to [our guide](/self-managed/operate-deployment/data-retention.md).

### Configuring Backups

In order to configure backups, please refer to the [backup guide](/self-managed/operational-guides/backup-restore/backup-and-restore.md) for self-managed

## Scaling and Performance

At this point you should already have a solid base to run your platform in a production setting. The rest of this guide gives you general Kubernetes based guidance on configuration of the Camunda Helm Chart for long-term maintenance.

Here are some points to keep in mind when considering scalability:

- To scale the Core component, the following values can be modified:

```yaml
core:
  clusterSize: "3"
  partitionCount: "3"
  replicationFactor: "3"
```

The `core.clusterSize` refers to the amount of brokers, the `core.partitionCount` refers to how each [partition](/docs/components/zeebe/technical-concepts/partitions.md) is setup in the cluster, and the `core.replicationFactor` refers to the [number of nodes](/docs/components/zeebe/technical-concepts/partitions.md/#replication).

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

- Version Management: Stay on a stable Camunda and Kubernetes version. Follow Camunda’s release notes for security patches or critical updates. A list of our supported versions Camunda Helm Charts can be found on the [version matrix](https://helm.camunda.io/camunda-platform/version-matrix/)
- Secrets should be created prior to installing the helm chart so they can be referenced as existing secrets when installing the helm chart.
  Please refer to the [Kuberentes documentation](https://kubernetes.io/docs/concepts/configuration/secret/) on how to create a secret.

  If you would not like to create a number of secrets before installing the Camunda Helm Chart then you can optionally add the following to your `production-values.yaml`:

  ```yaml
  global:
  secrets:
    autoGenerated: true
    name: "camunda-credentials"
  ```

A secret called `camunda-credentials` will be generated. It will include all the needed secret values for the Camunda Helm Chart.

:::note
The `camunda-credentials` generated secret will not be deleted if the helm chart is uninstalled
:::

- When upgrading the Camunda Helm Chart, make sure to read the [upgrade guide](/self-managed/operational-guides/update-guide/introduction.md) before upgrading and perform the upgrade on a test environment first before attempting in production.
- Make sure to not store any state or important, long term business data in the local file system of the container. A pod is transient, if the pod is restarted then the data will get wiped. It is better to create a volume and volume mount instead. Here is some example configuration for the core component to create persistent storage:

```yaml
core:
  extraVolumes:
    extraVolumes:
      - name: persistent-state
        emptyDir: {}
    extraVolumeMounts:
      - name: persistent-state
        mountPath: /mount
```

<!-- This seems very specific to the application. I might remove this: -->
<!-- - Mount Secrets as volumes, not environment variables -->

- It is recommended to set a memory and resource quota for your namespace. Please refer to the [Kubernetes documenation](https://kubernetes.io/docs/tasks/administer-cluster/manage-resources/quota-memory-cpu-namespace/) to do so.

## Security Guidelines

Here are some points to keep in mind when considering security:

- To limit unnecessary permissions, and reduce risk of token exploitations, it is recommended to disable auto-mounting of the default Service Account. It is possible to do so by adding the following to your `production-values.yaml`:

```yaml
identity:
  serviceAccount:
    enabled: false
console:
  serviceAccount:
    enabled: false
webModeler:
  serviceAccount:
    enabled: false
connectors:
  serviceAccount:
    enabled: false
core:
  serviceAccount:
    enabled: false
optimize:
  serviceAccount:
    enabled: false
```

You should only enable the auto-mounting of a service account token when the application explicitly needs access to the Kubernetes API server or you have created a service account with the exact permissions required for the application and bound it to the pod.

- If you have a use case for enabling [Network Policies](https://kubernetes.io/docs/concepts/services-networking/network-policies/) then it is recommended to do so.
<!--Maybe link this to customer: https://github.com/ahmetb/kubernetes-network-policy-recipes-->
- It is possible to have a pod security standard that is suitable to the security constraints you might have. This is possible through modifying the Pod Security Admission. Please refer to the [Kubernetes documentation](https://kubernetes.io/docs/concepts/security/pod-security-admission/) in order to do so.
- By default, the Camunda Helm Chart, uses a read-only root file-system configuration for the pod. It is recommended to keep this default. No addition needs to be made in your `production-values.yaml`.
- Disable privileged containers. This can be achieved by implementing a pod security policy. For more information please visit the [Kubernetes documentation](https://kubernetes.io/docs/concepts/security/pod-security-admission/)
- It is possible to modify either the `containerSecurityContext` or the `podSecurityContext`. For example, here is a configuration for the core component that can be added to your `production-values.yaml`:

```yaml
podSecurityContext:
  runAsNonRoot: true
  fsGroup: 1001
  seccompProfile:
    type: RuntimeDefault

containerSecurityContext:
  allowPrivilegeEscalation: false
  privileged: false
  readOnlyRootFilesystem: true
  runAsNonRoot: true
  runAsUser: 1001
  seccompProfile:
    type: RuntimeDefault
```

- It is recommended to pull images exclusively from a private registry, such as [Amazon ECR](https://aws.amazon.com/ecr/), rather than directly from Docker Hub. Doing so enhances control over the images, avoids rate limits, and improves performance and reliability. Additionally, you can configure your cluster to pull images only from trusted registries. Tools like [Open Policy Agent](https://blog.openpolicyagent.org/securing-the-kubernetes-api-with-open-policy-agent-ce93af0552c3#3c6e) can be used to enforce this restriction.
- Open Policy Agent can also be used to [whitelist for ingress hostnames](https://www.openpolicyagent.org/docs/latest/kubernetes-tutorial/#4-define-a-policy-and-load-it-into-opa-via-kubernetes).

## Observability and Monitoring

Here are some points to keep in mind when considering observability:

- It is possible to enable integration with Prometheus, a popular monitoring solution, in the Camunda Helm Chart. This can be configured by adding values below to your production-values.yaml:

```yaml
prometheusServiceMonitor:
  enabled: false
```

- A tool such as [Loki](https://grafana.com/oss/loki/) could be used for the retention and archival of logs. It can also be used to aggregate logs.
- It is possible to enable audit logging for Camunda components to track user actions, especially for sensitive data or configuration changes. Here is an example configuration to change the log level of optimize within the core components. This can be added in your `production-values.yaml`:

```yaml
core:
  env:
    - name: "OPTIMIZE_LOG_LEVEL"
      value: "TRACE"
```

## Bringing it All Together

Here is the full `production-values.yaml` considering all the above topics.

```yaml
# make sure to the values.yaml in a multinamespace setting and configure console likewise
global:
  ingress:
    enabled: true
    className: nginx
    host: "camunda.example.com"
    tls:
      enabled: true
      secretName: camunda-platform
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
core:
  retention:
  enabled: true
  minimumAge: 30d
  policyName: core-record-retention-policy
  ingress:
    grpc:
      enabled: true
      className: nginx
      host: "zeebe-grpc.camunda.example.com"
      tls:
        enabled: true
        secretName: camunda-platform-core-grpc
identity:
  externalDatabase:
    enabled: true
    host: "external-postgres-host"
    port: 5432
    username: "identity_user"
    database: "identity_db"
    existingSecret: "identity-db-secret"
    existingSecretPasswordKey: "database-password"
webModeler:
  externalDatabase:
    url: "jdbc:postgresql://external-postgres-host:5432/camunda_db"
    user: "camunda_user"
    password: "secure_password"
    existingSecret: "camunda-db-secret"
    existingSecretPasswordKey: "database-password"

elasticsearch:
  enabled: false
```

## Other Concepts to take note of

### Upgrade and Maintenance

Make sure secrets are not auto-generated on upgrade.

### Adding more Orchestration clusters

The next recommended step is to setup a multi-namespace deployment. A [guide](/self-managed/setup/guides/multi-namespace-deployment.md) for this is already available. This is the most recommended approach to allow you to setup various environments using the Camunda Orchestration Cluster.

### Running benchmarks

If you would like to run benchmarks on the platform then please refer to our [community project](https://github.com/camunda-community-hub/camunda-8-benchmark)
