---
id: using-external-elasticsearch
sidebar_label: External Elasticsearch
title: Use external Elasticsearch with Helm
description: "Learn how to use an external Elasticsearch instance in Camunda 8 Self-Managed Helm chart deployment."
---

This guide explains how to connect Camunda 8 to an external Elasticsearch instance.

By default, the [Helm chart deployment](/self-managed/deployment/helm/install/quick-install.md) creates a new Elasticsearch instance. You can also connect to an external Elasticsearch instance, either in the same Kubernetes cluster or outside it.

For production deployments, Camunda recommends managing Elasticsearch installations externally (without enabling the Elasticsearch subchart). This gives more flexibility for scaling, backups, and upgrades without affecting the rest of the Camunda installation.

## Prerequisites

Before configuring, collect the following information about your external Elasticsearch instance:

- URL to access the cluster (protocol, host, and port).
- Authentication requirements and credentials (if needed).
- TLS configuration: Is it publicly trusted, or do you need to provide a certificate?

## Configuration

### Parameters

| values.yaml option                                  | type    | default                             | description                                                                               |
| --------------------------------------------------- | ------- | ----------------------------------- | ----------------------------------------------------------------------------------------- |
| `global.elasticsearch.enabled`                      | boolean | `true`                              | Enable or disable all components connecting to Elasticsearch.                             |
| `global.elasticsearch.external`                     | boolean | `false`                             | Set to `true` to connect to an external Elasticsearch instance.                           |
| `global.elasticsearch.auth.username`                | string  | `""`                                | HTTP Basic username for Elasticsearch authentication.                                     |
| `global.elasticsearch.auth.password`                | string  | `""`                                | HTTP Basic password for Elasticsearch authentication.                                     |
| `global.elasticsearch.prefix`                       | string  | `zeebe-record`                      | Index prefix for zeebe-record indices. See [Prefix Elasticsearch indices](/self-managed/deployment/helm/configure/database/elasticsearch/prefix-elasticsearch-indices.md). |
| `global.elasticsearch.tls.enabled`                  | boolean | `false`                             | Whether Elasticsearch listens on TLS.                                                     |
| `global.elasticsearch.tls.secret.inlineSecret`      | string  | `""`                                | TLS certificate specified directly in `values.yaml`.                                      |
| `global.elasticsearch.tls.secret.existingSecret`    | string  | `""`                                | Kubernetes Secret name containing a TLS certificate.                                      |
| `global.elasticsearch.tls.secret.existingSecretKey` | string  | `""`                                | Kubernetes Secret key with the TLS certificate.                                           |
| `global.elasticsearch.url.protocol`                 | string  | `http`                              | Protocol to use when connecting to Elasticsearch. Possible values are `http` and `https`. |
| `global.elasticsearch.url.host`                     | string  | `{{ .Release.Name }}-elasticsearch` | Hostname or IP address of the Elasticsearch instance.                                     |
| `global.elasticsearch.url.port`                     | integer | `9200`                              | Port number of the Elasticsearch instance.                                                |
| `elasticsearch.enabled`                             | boolean | `true`                              | Enable or disable the Elasticsearch subchart.                                             |

:::tip Index prefixes
Index prefix configuration works the same way for both internal and external Elasticsearch. For details on configuring custom index prefixes to ensure data isolation in shared clusters, see [Prefix Elasticsearch/OpenSearch indices](/self-managed/deployment/helm/configure/database/elasticsearch/prefix-elasticsearch-indices.md).
:::

### Example usage

#### Connect to external Elasticsearch without a certificate

By default, `global.elasticsearch.url.protocol` is set to `http`. This makes it possible to connect to Elasticsearch without TLS.

Configure the Camunda 8 Self-Managed Helm chart as follows:

```yaml
global:
  elasticsearch:
    enabled: true
    external: true
    auth:
      username: elastic
      secret:
        inlineSecret: pass
    url:
      protocol: http
      host: elastic.example.com
      port: 443

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
   global:
     elasticsearch:
       enabled: true
       external: true
       tls:
         enabled: true
         existingSecret: elastic-jks
       auth:
         username: elastic
         secret:
           inlineSecret: pass
       url:
         protocol: https
         host: elastic.example.com
         port: 443

   elasticsearch:
     enabled: false
   ```

### Connect to external Elasticsearch with a publicly trusted certificate

This configuration works with managed Elasticsearch services. It has been tested with Elastic Cloud on Google Cloud.

```yaml
global:
  elasticsearch:
    enabled: true
    external: true
    auth:
      username: elastic
      secret:
        inlineSecret: pass
    url:
      protocol: https
      host: elastic.example.com
      port: 443

elasticsearch:
  enabled: false
```

### Connect to external Elasticsearch with custom index prefixes

When running multiple Camunda instances on a shared Elasticsearch cluster, use custom index prefixes to isolate data:

```yaml
global:
  elasticsearch:
    enabled: true
    external: true
    prefix: my-env-zeebe  # Prefix for zeebe-record indices
    auth:
      username: elastic
      secret:
        inlineSecret: pass
    url:
      protocol: https
      host: elastic.example.com
      port: 443

orchestration:
  index:
    prefix: my-env-camunda  # Prefix for unified Camunda indices

elasticsearch:
  enabled: false
```

For more details on index prefix configuration, including Optimize-specific settings, see [Prefix Elasticsearch/OpenSearch indices](/self-managed/deployment/helm/configure/database/elasticsearch/prefix-elasticsearch-indices.md).

## Troubleshooting

If Zeebe pods fail, check for the following error:

- The host is unreachable or DNS is not properly resolving to an IP address listening on the specified port.

  ```
  Caused by: java.net.UnknownHostException: elastic.example.com
  ```

## References

- [Camunda production installation guide with Kubernetes and Helm](/self-managed/operational-guides/production-guide/helm-chart-production-guide.md)
- [Prefix Elasticsearch/OpenSearch indices](/self-managed/deployment/helm/configure/database/elasticsearch/prefix-elasticsearch-indices.md)

## Next steps

Use the custom values file to [deploy Camunda 8](/self-managed/setup/overview.md):

```sh
helm install camunda camunda/camunda-platform --version $HELM_CHART_VERSION -f existing-elasticsearch-values.yaml
```
