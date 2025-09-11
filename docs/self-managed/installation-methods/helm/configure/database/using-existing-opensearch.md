---
id: using-existing-opensearch
sidebar_label: Using Amazon OpenSearch service
title: Helm chart Amazon OpenSearch service usage
description: "Learn how to use an Amazon OpenSearch Service instance in Camunda 8 Self-Managed deployment."
---

Camunda 8 Self-Managed has two different types of components:

- Camunda components such as Operate, Optimize, Tasklist, etc.
- Non-Camunda dependency components such as Keycloak and Elasticsearch.

For more details, review the [architecture](/self-managed/about-self-managed.md#architecture) documentation for more information on the different types of applications.

This guide steps through using an existing Amazon OpenSearch Service instance. By default, [Helm chart deployment](/self-managed/setup/overview.md) creates a new Elasticsearch instance, but it's possible to use Amazon OpenSearch Service instead.

## Preparation

### Authentication

Amazon OpenSearch requires two layers of permissions:

- AWS IAM and
- OpenSearch internal

To connect to OpenSearch using AWS IAM roles for service accounts (IRSA), see the [IAM roles for service accounts documentation](/self-managed/installation-methods/helm/cloud-providers/amazon/amazon-eks/terraform-setup.md#opensearch-module-setup).

To connect to OpenSearch using basic authentication, follow the example below:

## Values file

The following values can be configured in the Camunda 8 Self-Managed Helm chart in order to use Amazon OpenSearch Service:

### Connecting to Amazon OpenSearch Service with basic auth

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

From the above configuration, the internal Elasticsearch component and the Elasticsearch configuration for all components are disabled. This is required to use Amazon OpenSearch Service.

To avoid storing the username and password in plaintext in your `values.yaml`, reference a Kubernetes secret.
For details and examples, see [Helm charts secret management](/self-managed/installation-methods/helm/configure/secret-management.md).

## Component configuration

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

## Next steps

Use the custom values file to [deploy Camunda 8](/self-managed/setup/overview.md):

```sh
helm install camunda camunda/camunda-platform --version $HELM_CHART_VERSION -f existing-elasticsearch-values.yaml
```
