import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Data - exporters

<Tabs>
  <TabItem value="application.yaml" label="Application properties">

### `camunda.data.exporters`

| Property                                          | Description                                                                                                                               | Default value                                       |
| :------------------------------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------- |
| `camunda.data.exporters.elasticsearch.class-name` | <p>Fully qualified class name pointing to the class implementing the exporter interface.</p>                                              | `'io.camunda.zeebe.exporter.ElasticsearchExporter'` |
| `camunda.data.exporters.elasticsearch.jar-path`   | <p>Path to the JAR file containing the exporter class</p><p>Optional field: if missing, will lookup the class in the zeebe classpath.</p> | `-`                                                 |
| `camunda.data.exporters.elasticsearch.args`       | Map of arguments to use when instantiating the exporter.                                                                                  | `-`                                                 |

:::warning
If Zeebe records indices and secondary storage indices use the same Elasticsearch or OpenSearch cluster, you must configure different index prefixes.

Do not reuse the same prefix for:

- Zeebe records indices (configured via `camunda.data.exporters.elasticsearch.args.index-prefix`)
- Secondary storage indices (configured via `camunda.data.secondary-storage.{elasticsearch|opensearch}.index-prefix`)

Also ensure that one prefix does not include the other. For example, `custom` and `custom-zeebe` can conflict because wildcard patterns like `custom*` match both.
:::

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
