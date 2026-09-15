---
id: using-external-elasticsearch
sidebar_label: External Elasticsearch
title: Use external Elasticsearch for Orchestration Cluster with Helm
description: "Configure the Orchestration Cluster in Camunda 8 Self-Managed to use an external Elasticsearch instance when deploying with Helm."
---

Configure the Orchestration Cluster in Camunda 8 Self-Managed to connect to an external Elasticsearch instance as a secondary storage backend. Elasticsearch is used for indexing and querying operational data consumed by Orchestration Cluster applications and APIs. For a canonical definition, see [Elasticsearch/OpenSearch](/reference/glossary.md#elasticsearchopensearch).

Starting with Camunda 8.9, the Helm chart no longer provisions Elasticsearch by default. To use Elasticsearch as secondary storage for the Orchestration Cluster, explicitly configure it in your Helm values under `orchestration.data.secondaryStorage.elasticsearch`. You can either deploy Elasticsearch using the [ECK operator](/self-managed/deployment/helm/configure/operator-based-infrastructure.md#elasticsearch-deployment) (recommended) or connect Camunda to an existing external Elasticsearch instance, either running inside the same Kubernetes cluster or outside it.

This page applies to the Orchestration Cluster only. If you also deploy Optimize, configure Optimize separately using [use external Elasticsearch for Optimize with Helm](/self-managed/deployment/helm/configure/database/optimize/using-external-elasticsearch.md).

:::note
The bundled Elasticsearch Bitnami subchart (`elasticsearch.enabled: true`) is deprecated and will be removed in a future release. For production deployments, use the [ECK (Elastic Cloud on Kubernetes) operator](/self-managed/deployment/helm/configure/operator-based-infrastructure.md#elasticsearch-deployment) or a managed Elasticsearch service instead. See [deploy required dependencies with Kubernetes operators](/self-managed/deployment/helm/configure/operator-based-infrastructure.md) for details.
:::

## Prerequisites

Before configuring, collect the following information about your external Elasticsearch instance:

- URL to access the cluster (protocol, host, and port)
- Authentication requirements and credentials (if needed)
- TLS requirements:
  - Whether the certificate is publicly trusted
  - Whether you need to provide a custom or self-signed certificate

## Configuration

### Parameters

#### Orchestration Cluster secondary storage

| values.yaml option                                                                | type   | default | description                                                                                           |
| --------------------------------------------------------------------------------- | ------ | ------- | ----------------------------------------------------------------------------------------------------- |
| `orchestration.data.secondaryStorage.type`                                        | string | `""`    | Type of secondary storage. Set to `elasticsearch` to use Elasticsearch.                               |
| `orchestration.data.secondaryStorage.elasticsearch.url`                           | string | `""`    | URL for the Elasticsearch cluster as `scheme://host:port` (for example, `http://elasticsearch:9200`). |
| `orchestration.data.secondaryStorage.elasticsearch.auth.username`                 | string | `""`    | Username for Elasticsearch authentication.                                                            |
| `orchestration.data.secondaryStorage.elasticsearch.auth.secret.inlineSecret`      | string | `""`    | Elasticsearch password as a plain-text value (non-production only).                                   |
| `orchestration.data.secondaryStorage.elasticsearch.auth.secret.existingSecret`    | string | `""`    | Reference to an existing Kubernetes Secret containing the password.                                   |
| `orchestration.data.secondaryStorage.elasticsearch.auth.secret.existingSecretKey` | string | `""`    | Key within the existing Kubernetes Secret containing the password.                                    |
| `orchestration.data.secondaryStorage.elasticsearch.tls.secret.existingSecret`     | string | `""`    | Reference to an existing Kubernetes Secret containing the TLS trust store.                            |
| `orchestration.data.secondaryStorage.elasticsearch.tls.secret.existingSecretKey`  | string | `""`    | Key within the existing Kubernetes Secret for the TLS trust store.                                    |
| `orchestration.index.prefix`                                                      | string | `""`    | Index prefix in Elasticsearch for the new Camunda exporter and the Orchestration Cluster.             |

#### Bundled Elasticsearch subchart (deprecated)

| values.yaml option      | type    | default | description                                             |
| ----------------------- | ------- | ------- | ------------------------------------------------------- |
| `elasticsearch.enabled` | boolean | `false` | Enables or disables the bundled Elasticsearch subchart. |

### Example usage

#### Connect to external Elasticsearch without a certificate

Configure the Orchestration Cluster as follows:

```yaml
orchestration:
  data:
    secondaryStorage:
      type: elasticsearch
      elasticsearch:
        url: http://elastic.example.com:443
        auth:
          username: elastic
          secret:
            inlineSecret: pass

elasticsearch:
  enabled: false
```

#### Connect to external Elasticsearch with a self-signed certificate

If the Elasticsearch cluster accepts only `https` requests with a self-signed certificate:

1. Create an `externaldb.jks` file from the Elasticsearch certificate file. For example, using the `keytool` CLI:

   ```yaml
   keytool -import -alias elasticsearch -keystore externaldb.jks -storetype jks -file elastic.crt -storepass changeit -noprompt
   ```

1. Create a Kubernetes secret from the `externaldb.jks` file before installing Camunda:

   ```yaml
   kubectl  create secret -n camunda generic elastic-jks --from-file=externaldb.jks
   ```

1. Configure the Camunda 8 Self-Managed Helm chart:

   ```yaml
   orchestration:
     data:
       secondaryStorage:
         type: elasticsearch
         elasticsearch:
           url: https://elastic.example.com:443
           auth:
             username: elastic
             secret:
               inlineSecret: pass
           tls:
             secret:
               existingSecret: elastic-jks
               existingSecretKey: externaldb.jks

   elasticsearch:
     enabled: false
   ```

### Connect to external Elasticsearch with a publicly trusted certificate

This configuration works with managed Elasticsearch services. It has been tested with Elastic Cloud on Google Cloud.

```yaml
orchestration:
  data:
    secondaryStorage:
      type: elasticsearch
      elasticsearch:
        url: https://elastic.example.com:443
        auth:
          username: elastic
          secret:
            inlineSecret: pass

elasticsearch:
  enabled: false
```

### Connect to external Elasticsearch with custom index prefixes

When running multiple Camunda instances on a shared Elasticsearch cluster, use custom index prefixes to isolate data:

```yaml
orchestration:
  data:
    secondaryStorage:
      type: elasticsearch
      elasticsearch:
        url: https://elastic.example.com:443
        auth:
          username: elastic
          secret:
            inlineSecret: pass
  index:
    prefix: my-env-camunda # Prefix for Orchestration Cluster indices

elasticsearch:
  enabled: false
```

For more details on index prefix configuration, including Optimize-specific settings when Optimize is enabled, see [prefix Elasticsearch/OpenSearch indices](/self-managed/deployment/helm/configure/database/elasticsearch/configure-elasticsearch-prefix-indices.md).

## Troubleshooting

If Zeebe pods fail, check for the following error:

- The host is unreachable or DNS is not properly resolving to an IP address listening on the specified port.

  ```text
  Caused by: java.net.UnknownHostException: elastic.example.com
  ```

## References

- [Camunda production installation guide with Kubernetes and Helm](versioned_docs/version-8.7/self-managed/operational-guides/production-guide/helm-chart-production-guide.md) (8.8 version not yet available)
- [Use external Elasticsearch for Optimize with Helm](/self-managed/deployment/helm/configure/database/optimize/using-external-elasticsearch.md)
- [Configure Elasticsearch and OpenSearch index prefixes](/self-managed/deployment/helm/configure/database/elasticsearch/configure-elasticsearch-prefix-indices.md)

## Next steps

Use the custom values file to [deploy Camunda 8](/self-managed/setup/overview.md):

```sh
helm install camunda camunda/camunda-platform --version $HELM_CHART_VERSION -f existing-elasticsearch-values.yaml
```
