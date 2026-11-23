---
id: elasticsearch-and-opensearch
title: "Elasticsearch and Opensearch"
description: "The Orchestration Cluster stores and reads data from either Elasticsearch or OpenSearch."
---

The Orchestration Cluster stores and reads data from either **Elasticsearch** or **OpenSearch**. You can select the database by setting the `CAMUNDA_DATABASE` environment variable or the equivalent configuration property.

**Valid values:** `elasticsearch` (default) or `opensearch`.

```bash
CAMUNDA_DATABASE=opensearch
```

We now support [Amazon OpenSearch](https://aws.amazon.com/de/opensearch-service/). To see which versions are supported, refer to [supported environments](/reference/supported-environments.md). Using Amazon OpenSearch requires a new Camunda installation. Migration from previous Elasticsearch setups is not supported.

## Connection settings

To connect to a secured (HTTPS) Elasticsearch or OpenSearch instance:

- **URL protocol**: Use `https` instead of `http`.
- **Authentication**: Set a valid username/password combination for Basic authentication.
- **AWS credentials**: For Amazon OpenSearch, set `awsEnabled` to `true` to use AWS credentials instead of Basic authentication.
- **SSL/TLS**: SSL settings such as `self-signed` or disabling hostname verification should only be used if connection issues occur.
- **JVM certificates**: Certificates may need to be imported into the JVM runtime.

You can specify either `host` and `port` (deprecated) or `url` (recommended).

## Common configuration options

:::note
`{ES/OS}` in the names below is either `elasticsearch` or `opensearch`.
:::

| Name                                                               | Description                                                                                                                                                           | Default value                                  |
| ------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| `camunda.data.secondary-storage.{ES/OS}.cluster-name`              | Name of the Elasticsearch/OpenSearch cluster                                                                                                                          | elasticsearch / opensearch                     |
| `camunda.data.secondary-storage.{ES/OS}.url`                       | URL of the cluster REST API                                                                                                                                           | [http://localhost:9200](http://localhost:9200) |
| `camunda.data.secondary-storage.{ES/OS}.username`                  | Username to access the cluster REST API                                                                                                                               | -                                              |
| `camunda.data.secondary-storage.{ES/OS}.password`                  | Password to access the cluster REST API                                                                                                                               | -                                              |
| `camunda.data.secondary-storage.{ES/OS}.security.certificate-path` | Path to SSL certificate                                                                                                                                               | -                                              |
| `camunda.data.secondary-storage.{ES/OS}.security.self-signed`      | Certificate is self-signed                                                                                                                                            | false                                          |
| `camunda.data.secondary-storage.{ES/OS}.security.verify-hostname`  | Validate hostname for SSL                                                                                                                                             | true                                           |
| `camunda.database.aws-enabled`                                     | Use AWS credentials (OpenSearch only). Also set `zeebe.broker.exporters.camundaexporter.args.connect.awsEnabled`. In Helm, `global.opensearch.aws.enabled` sets both. | false                                          |
| `camunda.data.secondary-storage.{ES/OS}.index-prefix`              | Prefix for index names                                                                                                                                                | -                                              |
| `camunda.database.index.number-of-shards`                          | Number of shards for all indices                                                                                                                                      | 1                                              |
| `camunda.database.index.number-of-replicas`                        | Number of replicas for all indices                                                                                                                                    | 1                                              |

:::note
The schema initializer creates the indices from `camunda.database.index.*`. The Camunda Exporter `args.index` shard and replica settings do not change the indices. In Helm, set the replica count with `orchestration.index.replicas`.

The shard count applies when an index is created. To change it for existing indices, reindex them. The replica count also applies to existing indices: at startup, the schema manager updates their replica count to the configured value.
:::

## Application configuration examples

### Elasticsearch

```yaml
camunda:
  data:
    secondary-storage:
      elasticsearch:
        cluster-name: elasticsearch
        url: https://localhost:9200
        security:
          self-signed: true
```

### OpenSearch

```yaml
camunda:
  data:
    secondary-storage:
      opensearch:
        cluster-name: opensearch
        url: https://localhost:9200
        security:
          self-signed: true
```

## Disable Elasticsearch deprecation logging

For Elasticsearch version ≥8.16.0, it is recommended to turn off deprecation logging:

```bash
curl -X PUT "http://localhost:9200/_cluster/settings" \
  -H "Content-Type: application/json" \
  -d '{
    "persistent": {
      "logger.org.elasticsearch.deprecation": "OFF"
    }
  }'
```

## Notes

- Settings like `self-signed`, SSL verification, or AWS credentials apply depending on your deployment environment.
- Templates for indices are created automatically during first startup or upgrades. Manual adjustments to shards, replicas, or index settings can be made in the cluster templates.
