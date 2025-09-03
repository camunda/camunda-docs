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

As of version 8.4, the cluster supports [Amazon OpenSearch](https://aws.amazon.com/de/opensearch-service/) 2.5.x. Using Amazon OpenSearch requires a new Camunda installation. Migration from previous Elasticsearch setups is not supported.

## Connection settings

To connect to a secured (HTTPS) Elasticsearch or OpenSearch instance:

- **URL protocol**: Use `https` instead of `http`.
- **Authentication**: Set a valid username/password combination for basic authentication.
- **AWS credentials**: For Amazon OpenSearch, set `awsEnabled` to `true` to use AWS credentials instead of basic auth.
- **SSL/TLS**: SSL settings such as `selfSigned` or disabling hostname verification should only be used if connection issues occur.
- **JVM certificates**: Certificates may need to be imported into the JVM runtime.

You can specify either `host` and `port` (deprecated) or `url` (recommended).

## Common configuration options

| Name             | Description                                  | Default value                                  |
| ---------------- | -------------------------------------------- | ---------------------------------------------- |
| cluster-name     | Name of the Elasticsearch/OpenSearch cluster | elasticsearch / opensearch                     |
| url              | URL of the cluster REST API                  | [http://localhost:9200](http://localhost:9200) |
| username         | Username to access the cluster REST API      | -                                              |
| password         | Password to access the cluster REST API      | -                                              |
| certificate-path | Path to SSL certificate                      | -                                              |
| self-signed      | Certificate is self-signed                   | false                                          |
| verify-hostname  | Validate hostname for SSL                    | false                                          |
| awsEnabled          | Use AWS credentials (OpenSearch only)        | false                                          |
| index-prefix         | Prefix for index names                       | operate / tasklist                             |
| numberOfShards      | Number of shards for all indices             | 1                                              |
| numberOfReplicas    | Number of replicas for all indices           | 0                                              |

:::note
Shard and replica settings are applied on first startup or during version updates. After indices are created, they can be adjusted in the cluster template and applied to new indices.
:::

## Application configuration example

```yaml
camunda:
  elasticsearch:
    clusterName: elasticsearch
    url: https://localhost:9200
    ssl:
      selfSigned: true

  opensearch:
    clusterName: opensearch
    url: https://localhost:9200
    ssl:
      selfSigned: true
    awsEnabled: false
```

## Database selection (optional)

Some components may require explicit configuration of which database to use:

| Name             | Description                                              | Default value |
| ---------------- | -------------------------------------------------------- | ------------- |
| camunda.database | Database to connect to (`elasticsearch` or `opensearch`) | elasticsearch |

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

- Settings like `selfSigned`, SSL verification, or AWS credentials apply depending on your deployment environment.
- Templates for indices are created automatically during first startup or upgrades. Manual adjustments to shards, replicas, or index settings can be made in the cluster templates.
