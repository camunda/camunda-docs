---
id: using-external-opensearch
sidebar_label: Amazon OpenSearch Service
title: Use Amazon OpenSearch Service with the Helm chart
description: Learn how to connect a Camunda 8 Self-Managed Helm chart deployment to an external Amazon OpenSearch Service instance.
---

Learn how to configure and use Amazon OpenSearch with the Helm chart. When configured, OpenSearch is used as a secondary storage backend for indexing and search. See [Elasticsearch/OpenSearch](/reference/glossary.md#elasticsearchopensearch) for the canonical definition.

:::note
Secondary storage is configurable. For supported components, you can use an RDBMS-based secondary store instead. See [RDBMS configuration](/self-managed/concepts/databases/relational-db/configuration.md) or the glossary entry [RDBMS](/reference/glossary.md#rdbms).
:::

## About this guide

Camunda 8 Self-Managed includes two types of components:

- **Camunda components** such as Operate, Optimize, and Tasklist.
- **Non-Camunda dependencies** such as Keycloak and Elasticsearch.

For more details, see the [architecture overview](/self-managed/about-self-managed.md#architecture).

By default, the [Helm chart deployment](/self-managed/setup/overview.md) installs a new Elasticsearch instance. This guide explains how to configure the Camunda Helm chart to use an external Amazon OpenSearch Service instance instead.

:::note
In 8.9-alpha3, H2 is the default secondary storage for lightweight Camunda 8 Run and quick-install scenarios. Elasticsearch remains bundled and supported as an optional alternative; OpenSearch is supported for Self‑Managed deployments but is not bundled in Camunda 8 Run. Use this guide when you want to run or connect to an external OpenSearch cluster instead of the default H2 store.
:::

:::info OpenSearch support
Camunda 8 also supports the open-source [OpenSearch](https://opensearch.org/) distribution as well as [Amazon OpenSearch](https://aws.amazon.com/opensearch-service).
:::

## Prerequisites

Amazon OpenSearch requires two layers of permissions:

- AWS IAM permissions
- OpenSearch internal authentication

To connect to OpenSearch using AWS IAM roles for service accounts (IRSA), see the [IAM roles for service accounts documentation](/self-managed/deployment/helm/cloud-providers/amazon/amazon-eks/terraform-setup.md#opensearch-module-setup).

To connect to OpenSearch using basic authentication, follow the configuration below.

## Configuration

### Parameters

| Parameter                                         | Type    | Default          | Description                                                                                                                                                                                     |
| ------------------------------------------------- | ------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `global.opensearch.enabled`                       | boolean | `false`          | Enable external OpenSearch.                                                                                                                                                                     |
| `global.opensearch.aws.enabled`                   | boolean | `false`          | Enable AWS IRSA integration.                                                                                                                                                                    |
| `global.opensearch.tls.enabled`                   | boolean | `false`          | Enable TLS for external OpenSearch.                                                                                                                                                             |
| `global.opensearch.tls.existingSecret`            | string  | `""`             | Reference an existing TLS secret for OpenSearch.                                                                                                                                                |
| `global.opensearch.auth.username`                 | string  | `""`             | Username for OpenSearch.                                                                                                                                                                        |
| `global.opensearch.auth.secret.inlineSecret`      | string  | `""`             | Plain-text password for non-production use.                                                                                                                                                     |
| `global.opensearch.auth.secret.existingSecret`    | string  | `""`             | Reference an existing Kubernetes Secret containing the password.                                                                                                                                |
| `global.opensearch.auth.secret.existingSecretKey` | string  | `""`             | Key within the existing secret object.                                                                                                                                                          |
| `global.opensearch.url.protocol`                  | string  | `"https"`        | Access protocol for OpenSearch.                                                                                                                                                                 |
| `global.opensearch.url.host`                      | string  | `""`             | OpenSearch host, ideally the service name inside the namespace.                                                                                                                                 |
| `global.opensearch.url.port`                      | number  | `443`            | Port used to access OpenSearch.                                                                                                                                                                 |
| `global.opensearch.clusterName`                   | string  | `"opensearch"`   | Name of the OpenSearch cluster.                                                                                                                                                                 |
| `global.opensearch.prefix`                        | string  | `"zeebe-record"` | Index prefix for zeebe-record indices. See [Prefix Elasticsearch/OpenSearch indices](/self-managed/deployment/helm/configure/database/elasticsearch/configure-elasticsearch-prefix-indices.md). |

### Example usage

```yaml
global:
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

This configuration disables the internal Elasticsearch component and the Elasticsearch configuration for all components. This is required to use Amazon OpenSearch Service.

To avoid storing the username and password in plaintext in your `values.yaml`, reference a Kubernetes secret.
For details and examples, see [Helm charts secret management](/self-managed/deployment/helm/configure/secret-management.md).

### Connect to external OpenSearch with custom index prefixes

When running multiple Camunda instances on a shared OpenSearch cluster, use custom index prefixes to isolate data:

```yaml
global:
  elasticsearch:
    enabled: false
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

orchestration:
  index:
    prefix: my-env-camunda # Prefix for unified Camunda indices
```

For more details on index prefix configuration, including Optimize-specific settings, see [Prefix Elasticsearch/OpenSearch indices](/self-managed/deployment/helm/configure/database/elasticsearch/configure-elasticsearch-prefix-indices.md).

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
- [Prefix Elasticsearch/OpenSearch indices](/self-managed/deployment/helm/configure/database/elasticsearch/configure-elasticsearch-prefix-indices.md)
- [Deploy Camunda 8](/self-managed/setup/overview.md)
