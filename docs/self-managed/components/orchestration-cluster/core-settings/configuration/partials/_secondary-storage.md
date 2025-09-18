import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Secondary storage

### Connection

<Tabs>
  <TabItem value="secondary-storage-env" label="Environment variables" default>

| Environment variable                                                                                                                                | Description                                                                                         | Default value           |
| --------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | ----------------------- |
| `CAMUNDA_DATA_SECONDARYSTORAGE_TYPE`                                                                                                                | The type of secondary storage to use.                                                               | `elasticsearch`         |
| `CAMUNDA_DATA_SECONDARYSTORAGE_ELASTICSEARCH_URL`<br/><br/>`CAMUNDA_DATA_SECONDARYSTORAGE_OPENSEARCH_URL`                                           | The secondary storage hosts URL. Use the variant matching the selected type.                        | `http://localhost:9200` |
| `CAMUNDA_DATA_SECONDARYSTORAGE_ELASTICSEARCH_CLUSTERNAME`<br/><br/>`CAMUNDA_DATA_SECONDARYSTORAGE_OPENSEARCH_CLUSTERNAME`                           | The secondary storage cluster name. Use the variant matching the selected type.                     | `elasticsearch`         |
| `CAMUNDA_DATA_SECONDARYSTORAGE_ELASTICSEARCH_USERNAME`<br/><br/>`CAMUNDA_DATA_SECONDARYSTORAGE_OPENSEARCH_USERNAME`                                 | Username for accessing the secondary storage REST API (leave empty if not secured).                 | `-`                     |
| `CAMUNDA_DATA_SECONDARYSTORAGE_ELASTICSEARCH_PASSWORD`<br/><br/>`CAMUNDA_DATA_SECONDARYSTORAGE_OPENSEARCH_PASSWORD`                                 | Password for accessing the secondary storage REST API.                                              | `-`                     |
| `CAMUNDA_DATA_SECONDARYSTORAGE_ELASTICSEARCH_SECURITY_ENABLED`<br/><br/>`CAMUNDA_DATA_SECONDARYSTORAGE_OPENSEARCH_SECURITY_ENABLED`                 | Enables HTTPS and related SSL/TLS handling for the secondary storage connection.                    | `false`                 |
| `CAMUNDA_DATA_SECONDARYSTORAGE_ELASTICSEARCH_SECURITY_CERTIFICATEPATH`<br/><br/>`CAMUNDA_DATA_SECONDARYSTORAGE_OPENSEARCH_SECURITY_CERTIFICATEPATH` | Path to the trusted root or CA certificate file when using a custom/self-signed certificate.        | `-`                     |
| `CAMUNDA_DATA_SECONDARYSTORAGE_ELASTICSEARCH_SECURITY_VERIFYHOSTNAME`<br/><br/>`CAMUNDA_DATA_SECONDARYSTORAGE_OPENSEARCH_SECURITY_VERIFYHOSTNAME`   | Whether the hostname in the certificate must match the endpoint (disable only for troubleshooting). | `true`                  |
| `CAMUNDA_DATA_SECONDARYSTORAGE_ELASTICSEARCH_SECURITY_SELFSIGNED`<br/><br/>`CAMUNDA_DATA_SECONDARYSTORAGE_OPENSEARCH_SECURITY_SELFSIGNED`           | Indicates the certificate is self-signed (enables relaxed trust handling when supported).           | `false`                 |
| `CAMUNDA_DATA_SECONDARYSTORAGE_ELASTICSEARCH_INDEXPREFIX`<br/><br/>`CAMUNDA_DATA_SECONDARYSTORAGE_OPENSEARCH_INDEXPREFIX`                           | Prefix for secondary storage index names.                                                           | `-`                     |

  </TabItem>
  <TabItem value="secondary-storage-yaml" label="application.yaml">

| Application.yaml property                                                                                                                             | Description                                                                                         | Default value           |
| ----------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | ----------------------- |
| `camunda.data.secondary-storage.type`                                                                                                                 | The type of secondary storage to use.                                                               | `elasticsearch`         |
| `camunda.data.secondary-storage.elasticsearch.url`<br/><br/>`camunda.data.secondary-storage.opensearch.url`                                           | The secondary storage hosts URL. Use the property matching the selected type.                       | `http://localhost:9200` |
| `camunda.data.secondary-storage.elasticsearch.clusterName`<br/><br/>`camunda.data.secondary-storage.opensearch.clusterName`                           | The secondary storage cluster name. Use the property matching the selected type.                    | `elasticsearch`         |
| `camunda.data.secondary-storage.elasticsearch.username`<br/><br/>`camunda.data.secondary-storage.opensearch.username`                                 | Username for accessing the secondary storage REST API (leave empty if not secured).                 | `-`                     |
| `camunda.data.secondary-storage.elasticsearch.password`<br/><br/>`camunda.data.secondary-storage.opensearch.password`                                 | Password for accessing the secondary storage REST API.                                              | `-`                     |
| `camunda.data.secondary-storage.elasticsearch.security.enabled`<br/><br/>`camunda.data.secondary-storage.opensearch.security.enabled`                 | Enables HTTPS and related SSL/TLS handling for the secondary storage connection.                    | `false`                 |
| `camunda.data.secondary-storage.elasticsearch.security.certificatePath`<br/><br/>`camunda.data.secondary-storage.opensearch.security.certificatePath` | Path to the trusted root or CA certificate used when the certificate is custom/self-signed.         | `-`                     |
| `camunda.data.secondary-storage.elasticsearch.security.verifyHostname`<br/><br/>`camunda.data.secondary-storage.opensearch.security.verifyHostname`   | Whether the hostname in the certificate must match the endpoint (disable only for troubleshooting). | `true`                  |
| `camunda.data.secondary-storage.elasticsearch.security.selfSigned`<br/><br/>`camunda.data.secondary-storage.opensearch.security.selfSigned`           | Indicates the certificate is self-signed (enables relaxed trust handling when supported).           | `false`                 |
| `camunda.data.secondary-storage.elasticsearch.indexPrefix`<br/><br/>`camunda.data.secondary-storage.opensearch.indexPrefix`                           | Prefix for secondary storage index names.                                                           | `-`                     |

  </TabItem>
  <TabItem value="secondary-storage-helm" label="Helm values">

| Helm value key                                                                  | Description                                                                                 | Default value                                        |
| ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| `global.elasticsearch.enabled`<br/><br/>`global.opensearch.enabled`             | Enable Elasticsearch or OpenSearch as the secondary storage backend (enable exactly one).   | `true` (Elasticsearch)<br/><br/>`false` (OpenSearch) |
| `global.elasticsearch.auth.username`<br/><br/>`global.opensearch.auth.username` | Username for accessing the secondary storage cluster (leave empty if not secured).          | `-`                                                  |
| `global.elasticsearch.auth.password`<br/><br/>`global.opensearch.auth.password` | Password for accessing the secondary storage cluster. (Use secret-based auth if available.) | `-`                                                  |
| `orchestration.index.prefix`                                                    | Prefix for indices created in the secondary storage cluster                                 | `-`                                                  |

:::note
Enable exactly one of `global.elasticsearch.enabled` or `global.opensearch.enabled`. If both are set to `false`, you can also set `global.noSecondaryStorage=true` to run in engine-only mode. Do not set both providers to `true` simultaneously.
:::

  </TabItem>
</Tabs>

#### Secure connection (HTTPS / TLS)

To connect to a secured (`https`) Elasticsearch or OpenSearch cluster for secondary storage you typically only need to change the URL protocol from `http` to `https` and (if security is enabled on the cluster) provide `username` and `password`.

The additional security properties let you handle custom / self‑signed certificates or stricter hostname verification:

- Use `security.enabled=true` (or simply an `https` URL if auto-detection applies) to activate SSL/TLS handling.
- Use `security.certificatePath` when the server certificate is signed by a custom CA or is self‑signed so the JVM can trust it.
- Set `security.selfSigned=true` if the certificate is self‑signed and the client logic needs that hint (some stacks relax intermediate validation when this is set).
- Keep `security.verifyHostname=true` for production. Disable it only temporarily to diagnose hostname / certificate mismatch issues.

:::note
You may need to import the certificate (or its issuing CA) into the JVM trust store if it is not already trusted. For Kubernetes-based deployments this can also be achieved by mounting a trust store and pointing `certificatePath` to it.
:::

:::note
Set `indexPrefix` only if you need to segregate secondary storage indices from other indices in the same Elasticsearch/OpenSearch cluster (for example, when multiple Camunda environments share one cluster). Leave it unset (`-`) to use the component defaults.
:::

### Index & retention settings

The following properties control index creation characteristics (shards, replicas, template priority) and retention / lifecycle policies for secondary storage indices managed by the orchestration cluster.

<Tabs>
  <TabItem value="db-env" label="Environment variables" default>

| Environment variable                                | Description                                                                                                         | Default value                            |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| `CAMUNDA_DATABASE_INDEX_NUMBEROFSHARDS`             | Default number of primary shards for newly created indices.                                                         | `1`                                      |
| `CAMUNDA_DATABASE_INDEX_SHARDSBYINDEXNAME`          | JSON map overriding shard count per index (key=index name, value=shards).                                           | `-`                                      |
| `CAMUNDA_DATABASE_INDEX_NUMBEROFREPLICAS`           | Default number of replicas for newly created indices.                                                               | `0`                                      |
| `CAMUNDA_DATABASE_INDEX_REPLICASBYINDEXNAME`        | JSON map overriding replica count per index (key=index name, value=replicas).                                       | `-`                                      |
| `CAMUNDA_DATABASE_INDEX_TEMPLATEPRIORITY`           | Priority applied to index templates created by the platform. Higher value wins against wildcard provider templates. | `-`                                      |
| `CAMUNDA_DATABASE_RETENTION_ENABLED`                | Enables creation and application of retention / ILM policies.                                                       | `false`                                  |
| `CAMUNDA_DATABASE_RETENTION_MINIMUMAGE`             | Minimum age before data is eligible for deletion (retention).                                                       | `30d`                                    |
| `CAMUNDA_DATABASE_RETENTION_POLICYNAME`             | Name of the retention policy applied to standard indices.                                                           | `camunda-retention-policy`               |
| `CAMUNDA_DATABASE_RETENTION_USAGEMETRICSMINIMUMAGE` | Minimum age before usage metrics indices are deleted.                                                               | `730d`                                   |
| `CAMUNDA_DATABASE_RETENTION_USAGEMETRICSPOLICYNAME` | Name of the retention policy applied to usage metrics indices.                                                      | `camunda-usage-metrics-retention-policy` |

  </TabItem>
  <TabItem value="db-yaml" label="application.yaml">

| Application.yaml property                              | Description                                                                                                         | Default value                            |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| `camunda.database.index.number-of-shards`              | Default number of primary shards for newly created indices.                                                         | `1`                                      |
| `camunda.database.index.shards-by-index-name`          | Map overriding shard count per index (key=index name, value=shards).                                                | `-`                                      |
| `camunda.database.index.number-of-replicas`            | Default number of replicas for newly created indices.                                                               | `0`                                      |
| `camunda.database.index.replicas-by-index-name`        | Map overriding replica count per index (key=index name, value=replicas).                                            | `-`                                      |
| `camunda.database.index.template-priority`             | Priority applied to index templates created by the platform. Higher value wins against wildcard provider templates. | `-`                                      |
| `camunda.database.retention.enabled`                   | Enables creation and application of retention / ILM policies.                                                       | `false`                                  |
| `camunda.database.retention.minimum-age`               | Minimum age before data is eligible for deletion (retention).                                                       | `30d`                                    |
| `camunda.database.retention.policy-name`               | Name of the retention policy applied to standard indices.                                                           | `camunda-retention-policy`               |
| `camunda.database.retention.usage-metrics-minimum-age` | Minimum age before usage metrics indices are deleted.                                                               | `730d`                                   |
| `camunda.database.retention.usage-metrics-policy-name` | Name of the retention policy applied to usage metrics indices.                                                      | `camunda-usage-metrics-retention-policy` |

  </TabItem>
  <TabItem value="db-helm" label="Helm values">

| Helm value key                                           | Description                                                                                     | Default value                            |
| -------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | ---------------------------------------- |
| `orchestration.history.retention.enabled`                | Enables creation and application of retention / ILM policies for harmonized historical indices. | `false`                                  |
| `orchestration.history.retention.minimumAge`             | Minimum age before standard historical indices are deleted.                                     | `30d`                                    |
| `orchestration.history.retention.policyName`             | Name of the ILM policy applied to standard historical indices.                                  | `camunda-retention-policy`               |
| `orchestration.history.retention.usageMetricsMinimumAge` | Minimum age before usage metrics indices are deleted.                                           | `730d`                                   |
| `orchestration.history.retention.usageMetricsPolicyName` | Name of the ILM policy applied to usage metrics indices.                                        | `camunda-usage-metrics-retention-policy` |

:::note
Shards/replicas and template priority overrides are not currently exposed as dedicated Helm values in the chart. Configure these via environment variables or `application.yaml` properties (`camunda.database.index.*`) if supported by the runtime version.
:::

  </TabItem>
</Tabs>

:::note
Durations use the standard ISO-8601 or simplified suffix formats (e.g., `30d`, `12h`).
:::
:::note
Maps (e.g., shards/replicas overrides) are key-value objects where keys are index names and values override the global default.
:::
