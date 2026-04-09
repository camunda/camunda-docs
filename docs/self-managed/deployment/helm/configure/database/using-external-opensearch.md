---
id: using-external-opensearch
sidebar_label: Amazon OpenSearch Service
title: Use Amazon OpenSearch Service with the Helm chart
description: Learn how to connect a Camunda 8 Self-Managed Helm chart deployment to an external Amazon OpenSearch Service instance.
---

Configure Camunda 8 Self-Managed to use Amazon OpenSearch Service as a secondary storage backend when deploying with the Helm chart. OpenSearch is used for indexing and querying operational data consumed by multiple Camunda components. For a canonical definition, see [Elasticsearch/OpenSearch](/reference/glossary.md#elasticsearchopensearch).

Starting with Camunda 8.9, the Helm chart no longer provisions Elasticsearch by default. You can configure the Helm chart to connect to an external Amazon OpenSearch Service instance as an alternative secondary storage backend.

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
| `orchestration.data.secondaryStorage.opensearch.tls.secret.existingSecret`     | string | `""`    | Reference to an existing Kubernetes Secret containing the TLS trust store.                      |
| `orchestration.data.secondaryStorage.opensearch.tls.secret.existingSecretKey`  | string | `""`    | Key within the existing Kubernetes Secret for the TLS trust store.                              |
| `orchestration.index.prefix`                                                   | string | `""`    | Index prefix in OpenSearch for the new Camunda exporter and the Orchestration Cluster.          |

#### Optimize database

| Parameter                                                    | Type    | Default          | Description                                                                                                                                                                                                     |
| ------------------------------------------------------------ | ------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `optimize.database.opensearch.enabled`                       | boolean | `false`          | Enable external OpenSearch.                                                                                                                                                                                     |
| `optimize.database.opensearch.aws.enabled`                   | boolean | `false`          | Enable AWS IRSA integration.                                                                                                                                                                                    |
| `optimize.database.opensearch.auth.username`                 | string  | `""`             | Username for external OpenSearch authentication.                                                                                                                                                                |
| `optimize.database.opensearch.auth.secret.inlineSecret`      | string  | `""`             | OpenSearch password as a plain-text value (non-production only).                                                                                                                                                |
| `optimize.database.opensearch.auth.secret.existingSecret`    | string  | `""`             | Reference to an existing Kubernetes Secret containing the password.                                                                                                                                             |
| `optimize.database.opensearch.auth.secret.existingSecretKey` | string  | `""`             | Key within the existing Kubernetes Secret containing the password.                                                                                                                                              |
| `optimize.database.opensearch.prefix`                        | string  | `zeebe-record`   | Index prefix for `zeebe-record` indices. See [Configure Elasticsearch and OpenSearch index prefixes](/self-managed/deployment/helm/configure/database/elasticsearch/configure-elasticsearch-prefix-indices.md). |
| `optimize.database.opensearch.tls.enabled`                   | boolean | `false`          | Enable TLS for external OpenSearch.                                                                                                                                                                             |
| `optimize.database.opensearch.tls.secret.existingSecret`     | string  | `""`             | Name of the Kubernetes Secret containing a TLS certificate.                                                                                                                                                     |
| `optimize.database.opensearch.tls.secret.existingSecretKey`  | string  | `externaldb.jks` | Key within the secret containing the TLS certificate.                                                                                                                                                           |
| `optimize.database.opensearch.url.protocol`                  | string  | `""`             | Access protocol for OpenSearch. Possible values are `http` and `https`.                                                                                                                                         |
| `optimize.database.opensearch.url.host`                      | string  | `""`             | OpenSearch host, ideally the service name within the namespace.                                                                                                                                                 |
| `optimize.database.opensearch.url.port`                      | integer | `0`              | Port used to access OpenSearch.                                                                                                                                                                                 |

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

optimize:
  database:
    opensearch:
      enabled: true
      auth:
        username: user
        secret:
          # For non-production environments only:
          inlineSecret: "your-password-here"
          # For production (recommended):
          # existingSecret: "opensearch-secret"
          # existingSecretKey: "password"
      url:
        protocol: https
        host: opensearch.example.com
        port: 443
```

This configuration connects Camunda to an external Amazon OpenSearch Service instance. The Orchestration Cluster uses OpenSearch as its secondary storage backend, and Optimize is configured to query the same OpenSearch instance.

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

optimize:
  database:
    opensearch:
      enabled: true
      prefix: my-env-zeebe # Prefix for zeebe-record indices
      auth:
        username: admin
        secret:
          inlineSecret: pass
      url:
        protocol: https
        host: opensearch.example.com
        port: 443
```

For more details about index prefix configuration and Optimize-specific settings, see [Configure Elasticsearch and OpenSearch index prefixes](/self-managed/deployment/helm/configure/database/elasticsearch/configure-elasticsearch-prefix-indices.md).

### Component configuration

Camunda components use the same configuration keys for both Elasticsearch and OpenSearch.
To switch, replace the `elasticsearch` prefix with `opensearch` and provide the corresponding values.

For example:

- **Operate**: `CAMUNDA_OPERATE_ELASTICSEARCH_URL` → `CAMUNDA_OPERATE_OPENSEARCH_URL`
- **Tasklist**: `CAMUNDA_TASKLIST_ELASTICSEARCH_URL` → `CAMUNDA_TASKLIST_OPENSEARCH_URL`
- **Optimize**: `OPTIMIZE_ELASTICSEARCH_HTTP_PORT` → `CAMUNDA_OPTIMIZE_OPENSEARCH_HTTP_PORT`

For **Zeebe**, configure the [OpenSearch exporter](/self-managed/components/orchestration-cluster/zeebe/exporters/opensearch-exporter.md).

For full parameter details, see:

- [Operate configuration](/self-managed/components/orchestration-cluster/operate/operate-configuration.md#settings-for-opensearch)
- [Tasklist configuration](/self-managed/components/orchestration-cluster/tasklist/tasklist-configuration.md#elasticsearch-or-opensearch)
- [Optimize configuration](/self-managed/components/optimize/configuration/system-configuration.md#opensearch)

## References

- [Helm charts secret management](/self-managed/deployment/helm/configure/secret-management.md)
- [IAM roles for service accounts](/self-managed/deployment/helm/cloud-providers/amazon/amazon-eks/terraform-setup.md#opensearch-module-setup)
- [OpenSearch exporter](/self-managed/components/orchestration-cluster/zeebe/exporters/opensearch-exporter.md)
- [Configure Elasticsearch and OpenSearch index prefixes](/self-managed/deployment/helm/configure/database/elasticsearch/configure-elasticsearch-prefix-indices.md)
- [Deploy Camunda 8](/self-managed/setup/overview.md)
