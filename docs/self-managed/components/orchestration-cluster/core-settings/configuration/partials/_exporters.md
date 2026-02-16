import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Data - exporters

:::warning
When Elasticsearch/OpenSearch Exporter indices and Orchestration Cluster indices share the same Elasticsearch or OpenSearch cluster, their index prefixes must be different, one prefix must not be the beginning of the other (for example, avoid `custom` and `custom-zeebe` together because `custom*` matches both), and they must not use the reserved Orchestration index names `operate`, `tasklist`, or `camunda`.

The exporter prefix is configured via `camunda.data.exporters.elasticsearch.args.index-prefix` (and `CAMUNDA_DATA_EXPORTERS_{ELASTICSEARCH|OPENSEARCH}_ARGS_INDEX_PREFIX`).

For detailed requirements, configuration examples, and common mistakes, see
[index prefix configuration](/self-managed/deployment/helm/configure/database/elasticsearch/configure-elasticsearch-prefix-indices.md#index-prefix-configuration).
:::

<Tabs>
  <TabItem value="application.yaml" label="Application properties">

### `camunda.data.exporters`

| Property                                          | Description                                                                                                                               | Default value                                       |
| :------------------------------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------- |
| `camunda.data.exporters.elasticsearch.class-name` | <p>Fully qualified class name pointing to the class implementing the exporter interface.</p>                                              | `'io.camunda.zeebe.exporter.ElasticsearchExporter'` |
| `camunda.data.exporters.elasticsearch.jar-path`   | <p>Path to the JAR file containing the exporter class</p><p>Optional field: if missing, will lookup the class in the zeebe classpath.</p> | `-`                                                 |
| `camunda.data.exporters.elasticsearch.args`       | Map of arguments to use when instantiating the exporter.                                                                                  | `-`                                                 |

</TabItem>
<TabItem value="env" label="Environment variables">

### `CAMUNDA_DATA_EXPORTERS`

| Property                                         | Description                                                                                                                               | Default value                                       |
| :----------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------- |
| `CAMUNDA_DATA_EXPORTERS_ELASTICSEARCH_CLASSNAME` | <p>Fully qualified class name pointing to the class implementing the exporter interface.</p>                                              | `'io.camunda.zeebe.exporter.ElasticsearchExporter'` |
| `CAMUNDA_DATA_EXPORTERS_ELASTICSEARCH_JARPATH`   | <p>Path to the JAR file containing the exporter class</p><p>Optional field: if missing, will lookup the class in the zeebe classpath.</p> | `-`                                                 |
| `CAMUNDA_DATA_EXPORTERS_ELASTICSEARCH_ARGS`      | Map of arguments to use when instantiating the exporter.                                                                                  | `-`                                                 |

  </TabItem>
</Tabs>
