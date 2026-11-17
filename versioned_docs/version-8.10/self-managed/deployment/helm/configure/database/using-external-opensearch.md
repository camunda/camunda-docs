---
id: using-external-opensearch
sidebar_label: Amazon OpenSearch Service
title: Use Amazon OpenSearch Service for Orchestration Cluster with Helm
description: Learn how to connect the Orchestration Cluster in a Camunda 8 Self-Managed Helm deployment to an external Amazon OpenSearch Service instance.
---

Configure the Orchestration Cluster in Camunda 8 Self-Managed to use Amazon OpenSearch Service as a secondary storage backend when deploying with the Helm chart. OpenSearch is used for indexing and querying operational data consumed by Orchestration Cluster applications and APIs. For a canonical definition, see [Elasticsearch/OpenSearch](/reference/glossary.md#elasticsearchopensearch).

Starting with Camunda 8.9, the Helm chart no longer provisions Elasticsearch by default. You can configure the Helm chart to connect to an external Amazon OpenSearch Service instance as an alternative secondary storage backend.

This page applies to the Orchestration Cluster only. If you also deploy Optimize, configure Optimize separately using [use external OpenSearch for Optimize with Helm](/self-managed/deployment/helm/configure/database/optimize/using-external-opensearch.md).

Secondary storage is configurable. For supported components, you can use an RDBMS-based secondary store instead. See [RDBMS configuration](/self-managed/concepts/databases/relational-db/configuration.md) or the glossary entry [RDBMS](/reference/glossary.md#rdbms). For the [quick-install](/self-managed/deployment/helm/install/quick-install.md) scenario, RDBMS with embedded H2 is used instead.

:::info OpenSearch support
Camunda 8 supports both the open-source [OpenSearch](https://opensearch.org/) distribution and [Amazon OpenSearch Service](https://aws.amazon.com/opensearch-service).
:::

## Prerequisites

Amazon OpenSearch requires two layers of permissions:

- AWS IAM permissions
- OpenSearch internal authentication

To connect to OpenSearch using AWS IAM roles for service accounts (IRSA), see the [IAM roles for service accounts documentation](/self-managed/deployment/helm/cloud-providers/amazon/amazon-eks/terraform-setup.md#opensearch-module-setup).

To connect to OpenSearch using Basic authentication, follow the configuration below.

## Configuration

### Parameters

#### Orchestration Cluster secondary storage

| Parameter                                                                      | Type   | Default | Description                                                                                     |
| ------------------------------------------------------------------------------ | ------ | ------- | ----------------------------------------------------------------------------------------------- |
| `orchestration.data.secondaryStorage.type`                                     | string | `""`    | Type of secondary storage. Set to `opensearch` to use OpenSearch.                               |
| `orchestration.data.secondaryStorage.opensearch.url`                           | string | `""`    | URL for the OpenSearch cluster as `scheme://host:port` (for example, `https://opensearch:443`). |
| `orchestration.data.secondaryStorage.opensearch.auth.username`                 | string | `""`    | Username for OpenSearch authentication.                                                         |
| `orchestration.data.secondaryStorage.opensearch.auth.secret.inlineSecret`      | string | `""`    | OpenSearch password as a plain-text value (non-production only).                                |
| `orchestration.data.secondaryStorage.opensearch.auth.secret.existingSecret`    | string | `""`    | Reference to an existing Kubernetes Secret containing the password.                             |
| `orchestration.data.secondaryStorage.opensearch.auth.secret.existingSecretKey` | string | `""`    | Key within the existing Kubernetes Secret containing the password.                              |
| `orchestration.data.secondaryStorage.opensearch.tls.secret.existingSecret`     | string | `""`    | Deprecated in chart 15.x. Use `global.tls.caBundle.secret.existingSecret` instead.              |
| `orchestration.data.secondaryStorage.opensearch.tls.secret.existingSecretKey`  | string | `""`    | Deprecated in chart 15.x. Use `global.tls.caBundle.secret.existingSecretKey` instead.           |
| `orchestration.index.prefix`                                                   | string | `""`    | Index prefix in OpenSearch for the new Camunda exporter and the Orchestration Cluster.          |

To trust a private CA for the OpenSearch connection, supply a PEM CA bundle through `global.tls.caBundle.secret`. See [Configure TLS](/self-managed/deployment/helm/configure/tls.md).

### Example usage

```yaml
orchestration:
  data:
    secondaryStorage:
      type: opensearch
      opensearch:
        url: https://opensearch.example.com:443
        auth:
          username: user
          secret:
            # For non-production environments only:
            inlineSecret: "your-password-here"
            # For production (recommended):
            # existingSecret: "opensearch-secret"
            # existingSecretKey: "password"
```

This configuration connects the Orchestration Cluster to an external Amazon OpenSearch Service instance as its secondary storage backend.

To avoid storing the username and password in plaintext in your `values.yaml`, reference a Kubernetes secret.
For details and examples, see [Helm charts secret management](/self-managed/deployment/helm/configure/secret-management.md).

### Connect to external OpenSearch with custom index prefixes

When running multiple Camunda instances on a shared OpenSearch cluster, use custom index prefixes to isolate data:

```yaml
orchestration:
  data:
    secondaryStorage:
      type: opensearch
      opensearch:
        url: https://opensearch.example.com:443
        auth:
          username: admin
          secret:
            inlineSecret: pass
  index:
    prefix: my-env-camunda # Prefix for Orchestration Cluster indices
```

For more details about index prefix configuration and Optimize-specific settings, see [Configure Elasticsearch and OpenSearch index prefixes](/self-managed/deployment/helm/configure/database/elasticsearch/configure-elasticsearch-prefix-indices.md).

### Component configuration

Operate and Tasklist use the secondary storage configuration of the Orchestration Cluster. For the underlying properties, see the [secondary storage properties](/self-managed/components/orchestration-cluster/core-settings/configuration/properties.md#data---secondary-storage) and [configure secondary storage](/self-managed/concepts/secondary-storage/configuring-secondary-storage.md).

For **Zeebe**, configure the [OpenSearch exporter](/self-managed/components/orchestration-cluster/zeebe/exporters/opensearch-exporter.md).

## References

- [Helm charts secret management](/self-managed/deployment/helm/configure/secret-management.md)
- [IAM roles for service accounts](/self-managed/deployment/helm/cloud-providers/amazon/amazon-eks/terraform-setup.md#opensearch-module-setup)
- [OpenSearch exporter](/self-managed/components/orchestration-cluster/zeebe/exporters/opensearch-exporter.md)
- [Use external OpenSearch for Optimize with Helm](/self-managed/deployment/helm/configure/database/optimize/using-external-opensearch.md)
- [Configure Elasticsearch and OpenSearch index prefixes](/self-managed/deployment/helm/configure/database/elasticsearch/configure-elasticsearch-prefix-indices.md)
- [Deploy Camunda 8](/self-managed/setup/overview.md)
