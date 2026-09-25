import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::note
This step is only required for restoring an Elasticsearch/OpenSearch snapshot on a fresh cluster.
:::

This step includes restoring index and component [templates](https://www.elastic.co/docs/manage-data/data-store/templates) crucial for Camunda 8 to function properly on continuous use.

These templates are automatically applied on newly created indices. These templates are only created on the initial start of the components and the first seeding of the secondary datastore, due to which you have to temporarily restore them before you can restore all Elasticsearch/OpenSearch snapshots.

Start Camunda 8 configured with your secondary datastore endpoint:

- For example, deploy the Camunda Helm chart.
- For manual context, start Camunda 8 components manually.
- Depending on your setup this can mean Orchestration Cluster (Operate, Tasklist, Zeebe), Optimize and the required secondary datastore.

The templates are created by the Web Applications (Operate, Tasklist), and Optimize on startup on the first seeding of the datastore. Zeebe creates this whenever it is required, and isn't limited to the initial start. We recommend starting your full required Camunda 8 stack for the applications to show up as healthy.

You can confirm the successful creation of the index templates by using the Elasticsearch/OpenSearch API. The index templates rely on the component templates, so it also confirms these were successfully recreated.

<Tabs groupId="search-engine">
   <TabItem value="elasticsearch" label="Elasticsearch" default>

The following uses the [Elasticsearch Index API](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-indices-get-index-template) to list all index templates.

```bash
curl -s "$ELASTIC_ENDPOINT/_index_template" \
   | jq -r '.index_templates[].name' \
   | grep -E 'operate|tasklist|optimize|zeebe' \
   | sort
```

   <details>
      <summary>Example Output</summary>

      ```bash
      operate-batch-operation-1.0.0_template
      operate-decision-instance-8.3.0_template
      operate-event-8.3.0_template
      operate-flownode-instance-8.3.1_template
      operate-incident-8.3.1_template
      operate-job-8.6.0_template
      operate-list-view-8.3.0_template
      operate-message-8.5.0_template
      operate-operation-8.4.1_template
      operate-post-importer-queue-8.3.0_template
      operate-sequence-flow-8.3.0_template
      operate-variable-8.3.0_template
      tasklist-draft-task-variable-8.3.0_template
      tasklist-task-8.5.0_template
      tasklist-task-variable-8.3.0_template
      ...
      ```

   </details>

   </TabItem>
   <TabItem value="opensearch" label="OpenSearch">

The following uses the [OpenSearch Index API](https://docs.opensearch.org/docs/latest/api-reference/index-apis/get-index-template/) to list all index templates.

```bash
curl -s "$OPENSEARCH_ENDPOINT/_index_template" \
   | jq -r '.index_templates[].name' \
   | grep -E 'operate|tasklist|optimize|zeebe' \
   | sort
```

   <details>
      <summary>Example Output</summary>

      ```bash
      operate-batch-operation-1.0.0_template
      operate-decision-instance-8.3.0_template
      operate-event-8.3.0_template
      operate-flownode-instance-8.3.1_template
      operate-incident-8.3.1_template
      operate-job-8.6.0_template
      operate-list-view-8.3.0_template
      operate-message-8.5.0_template
      operate-operation-8.4.1_template
      operate-post-importer-queue-8.3.0_template
      operate-sequence-flow-8.3.0_template
      operate-user-task-8.5.0_template
      operate-variable-8.3.0_template
      tasklist-draft-task-variable-8.3.0_template
      tasklist-task-8.5.0_template
      tasklist-task-variable-8.3.0_template
      ...
      ```

   </details>

   </TabItem>
</Tabs>
