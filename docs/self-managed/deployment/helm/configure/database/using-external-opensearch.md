---
id: using-external-opensearch
sidebar_label: Amazon OpenSearch Service
title: Use Amazon OpenSearch Service with the Helm chart
description: Learn how to connect a Camunda 8 Self-Managed Helm chart deployment to an external Amazon OpenSearch Service instance.
---

Camunda 8 Self-Managed includes two types of components:

- **Camunda components** such as Operate, Optimize, and Tasklist.
- **Non-Camunda dependencies** such as Keycloak and Elasticsearch.

For more details, see the [architecture overview](/self-managed/about-self-managed.md#architecture).

By default, the [Helm chart deployment](/self-managed/setup/overview.md) installs a new Elasticsearch instance. This guide explains how to configure the Camunda Helm chart to use an external Amazon OpenSearch Service instance instead.

## Prerequisites

Amazon OpenSearch requires two layers of permissions:

- AWS IAM permissions
- OpenSearch internal authentication

To connect to OpenSearch using AWS IAM roles for service accounts (IRSA), see the [IAM roles for service accounts documentation](/self-managed/deployment/helm/cloud-providers/amazon/amazon-eks/terraform-setup.md#opensearch-module-setup).

To connect to OpenSearch using basic authentication, follow the configuration below.

## Configuration

### Parameters

| Parameter                                         | Type    | Default          | Description                                                      |
| ------------------------------------------------- | ------- | ---------------- | ---------------------------------------------------------------- |
| `global.opensearch.enabled`                       | boolean | `false`          | Enable external OpenSearch.                                      |
| `global.opensearch.aws.enabled`                   | boolean | `false`          | Enable AWS IRSA integration.                                     |
| `global.opensearch.tls.enabled`                   | boolean | `false`          | Enable TLS for external OpenSearch.                              |
| `global.opensearch.tls.existingSecret`            | string  | `""`             | Reference an existing TLS secret for OpenSearch.                 |
| `global.opensearch.auth.username`                 | string  | `""`             | Username for OpenSearch.                                         |
| `global.opensearch.auth.secret.inlineSecret`      | string  | `""`             | Plain-text password for non-production use.                      |
| `global.opensearch.auth.secret.existingSecret`    | string  | `""`             | Reference an existing Kubernetes Secret containing the password. |
| `global.opensearch.auth.secret.existingSecretKey` | string  | `""`             | Key within the existing secret object.                           |
| `global.opensearch.url.protocol`                  | string  | `"https"`        | Access protocol for OpenSearch.                                  |
| `global.opensearch.url.host`                      | string  | `""`             | OpenSearch host, ideally the service name inside the namespace.  |
| `global.opensearch.url.port`                      | number  | `443`            | Port used to access OpenSearch.                                  |
| `global.opensearch.clusterName`                   | string  | `"opensearch"`   | Name of the OpenSearch cluster.                                  |
| `global.opensearch.prefix`                        | string  | `"zeebe-record"` | Prefix used for OpenSearch indices or records.                   |

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
- [Deploy Camunda 8](/self-managed/setup/overview.md)
