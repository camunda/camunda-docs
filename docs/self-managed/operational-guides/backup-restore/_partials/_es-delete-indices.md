import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Now that you have successfully restored the templates and stopped the components adding more indices, you must delete the existing indices to be able to successfully restore the snapshots (otherwise these will block a successful restore).

<Tabs groupId="search-engine">
   <TabItem value="elasticsearch" label="Elasticsearch" default>

The following uses the [Elasticsearch CAT API](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-cat-indices) to list all indices. It also uses the [Elasticsearch Index API](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-indices-delete) to delete an index.

```bash
for index in $(curl -s "$ELASTIC_ENDPOINT/_cat/indices?h=index" \
   | grep -E 'camunda|operate|tasklist|optimize|zeebe'); do
      echo "Deleting index: $index"
      curl -X DELETE "$ELASTIC_ENDPOINT/$index"
done
```

   <details>
      <summary>Example Output</summary>

      ```bash
      Deleting index: operate-import-position-8.3.0_
      {"acknowledged":true}Deleting index: operate-migration-steps-repository-1.1.0_
      {"acknowledged":true}Deleting index: operate-flownode-instance-8.3.1_
      {"acknowledged":true}Deleting index: operate-event-8.3.0_
      {"acknowledged":true}Deleting index: operate-incident-8.3.1_
      {"acknowledged":true}Deleting index: tasklist-web-session-1.1.0_
      {"acknowledged":true}Deleting index: tasklist-variable-8.3.0_
      {"acknowledged":true}Deleting index: operate-user-task-8.5.0_
      {"acknowledged":true}Deleting index: tasklist-import-position-8.2.0_
      {"acknowledged":true}Deleting index: tasklist-task-variable-8.3.0_
      {"acknowledged":true}Deleting index: tasklist-flownode-instance-8.3.0_
      {"acknowledged":true}Deleting index: operate-process-8.3.0_
      {"acknowledged":true}Deleting index: tasklist-process-instance-8.3.0_
      {"acknowledged":true}Deleting index: operate-operation-8.4.1_
      {"acknowledged":true}Deleting index: operate-job-8.6.0_
      {"acknowledged":true}Deleting index: operate-metric-8.3.0_
      {"acknowledged":true}Deleting index: tasklist-migration-steps-repository-1.1.0_
      {"acknowledged":true}Deleting index: operate-decision-8.3.0_
      {"acknowledged":true}Deleting index: tasklist-process-8.4.0_
      {"acknowledged":true}Deleting index: operate-variable-8.3.0_
      {"acknowledged":true}Deleting index: operate-message-8.5.0_
      {"acknowledged":true}Deleting index: operate-decision-requirements-8.3.0_
      {"acknowledged":true}Deleting index: operate-batch-operation-1.0.0_
      {"acknowledged":true}Deleting index: operate-web-session-1.1.0_
      {"acknowledged":true}Deleting index: tasklist-user-1.4.0_
      {"acknowledged":true}Deleting index: operate-list-view-8.3.0_
      {"acknowledged":true}Deleting index: tasklist-metric-8.3.0_
      {"acknowledged":true}Deleting index: operate-post-importer-queue-8.3.0_
      {"acknowledged":true}Deleting index: tasklist-task-8.5.0_
      {"acknowledged":true}Deleting index: tasklist-form-8.4.0_
      {"acknowledged":true}Deleting index: operate-user-1.2.0_
      {"acknowledged":true}Deleting index: tasklist-draft-task-variable-8.3.0_
      {"acknowledged":true}Deleting index: operate-decision-instance-8.3.0_
      {"acknowledged":true}Deleting index: operate-sequence-flow-8.3.0_
      {"acknowledged":true}
      ```

   </details>

   </TabItem>
   <TabItem value="opensearch" label="OpenSearch">

The following uses the [OpenSearch CAT API](https://docs.opensearch.org/docs/latest/api-reference/cat/cat-indices/) to list all indices. It also uses the [OpenSearch Index API](https://docs.opensearch.org/docs/latest/api-reference/index-apis/delete-index/) to delete an index.

```bash
for index in $(curl -s "$OPENSEARCH_ENDPOINT/_cat/indices?h=index" \
   | grep -E 'camunda|operate|tasklist|optimize|zeebe'); do
      echo "Deleting index: $index"
      curl -X DELETE "$OPENSEARCH_ENDPOINT/$index"
done
```

   <details>
      <summary>Example Output</summary>

      ```bash
      Deleting index: operate-import-position-8.3.0_
      {"acknowledged":true}Deleting index: operate-migration-steps-repository-1.1.0_
      {"acknowledged":true}Deleting index: operate-flownode-instance-8.3.1_
      {"acknowledged":true}Deleting index: operate-event-8.3.0_
      {"acknowledged":true}Deleting index: operate-incident-8.3.1_
      {"acknowledged":true}Deleting index: tasklist-web-session-1.1.0_
      {"acknowledged":true}Deleting index: tasklist-variable-8.3.0_
      {"acknowledged":true}Deleting index: operate-user-task-8.5.0_
      {"acknowledged":true}Deleting index: tasklist-import-position-8.2.0_
      {"acknowledged":true}Deleting index: tasklist-task-variable-8.3.0_
      {"acknowledged":true}Deleting index: tasklist-flownode-instance-8.3.0_
      {"acknowledged":true}Deleting index: operate-process-8.3.0_
      {"acknowledged":true}Deleting index: tasklist-process-instance-8.3.0_
      {"acknowledged":true}Deleting index: operate-operation-8.4.1_
      {"acknowledged":true}Deleting index: operate-job-8.6.0_
      {"acknowledged":true}Deleting index: operate-metric-8.3.0_
      {"acknowledged":true}Deleting index: tasklist-migration-steps-repository-1.1.0_
      {"acknowledged":true}Deleting index: operate-decision-8.3.0_
      {"acknowledged":true}Deleting index: tasklist-process-8.4.0_
      {"acknowledged":true}Deleting index: operate-variable-8.3.0_
      {"acknowledged":true}Deleting index: operate-message-8.5.0_
      {"acknowledged":true}Deleting index: operate-decision-requirements-8.3.0_
      {"acknowledged":true}Deleting index: operate-batch-operation-1.0.0_
      {"acknowledged":true}Deleting index: operate-web-session-1.1.0_
      {"acknowledged":true}Deleting index: tasklist-user-1.4.0_
      {"acknowledged":true}Deleting index: operate-list-view-8.3.0_
      {"acknowledged":true}Deleting index: tasklist-metric-8.3.0_
      {"acknowledged":true}Deleting index: operate-post-importer-queue-8.3.0_
      {"acknowledged":true}Deleting index: tasklist-task-8.5.0_
      {"acknowledged":true}Deleting index: tasklist-form-8.4.0_
      {"acknowledged":true}Deleting index: operate-user-1.2.0_
      {"acknowledged":true}Deleting index: tasklist-draft-task-variable-8.3.0_
      {"acknowledged":true}Deleting index: operate-decision-instance-8.3.0_
      {"acknowledged":true}Deleting index: operate-sequence-flow-8.3.0_
      {"acknowledged":true}
      ```

   </details>

   </TabItem>
</Tabs>
