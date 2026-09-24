import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

**Restore the snapshots**

Although the backup order was important so far to ensure consistent backups, you can restore the backed up indices in any order.

As the components do not have an endpoint to restore the backup in Elasticsearch, you will need to restore it yourself directly in your selected datastore.

Using your chosen backup ID from the previous step, restore the snapshots in Elasticsearch/OpenSearch for each available backup under the same backup ID.

<Tabs groupId="search-engine">
   <TabItem value="elasticsearch" label="Elasticsearch" default>

The following uses the [Elasticsearch snapshot API](https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-snapshot-restore) to restore a snapshot.

```bash
curl -XPOST "$ELASTIC_ENDPOINT/_snapshot/$ELASTIC_SNAPSHOT_REPOSITORY/$SNAPSHOT_NAME/_restore?wait_for_completion=true"
```

   </TabItem>
   <TabItem value="opensearch" label="OpenSearch">

The following uses the [OpenSearch snapshot API](https://docs.opensearch.org/docs/latest/api-reference/snapshots/restore-snapshot/) to restore a snapshot.

```bash
curl -XPOST "$OPENSEARCH_ENDPOINT/_snapshot/$OPENSEARCH_SNAPSHOT_REPOSITORY/$SNAPSHOT_NAME/_restore?wait_for_completion=true"
```

   </TabItem>
</Tabs>

Where `$SNAPSHOT_NAME` would be any of the following, based on the backup ID you found earlier:

```bash
camunda_optimize_1748937221_8.8.0_part_1_of_2
camunda_optimize_1748937221_8.8.0_part_2_of_2
camunda_webapps_1748937221_8.8.0_part_1_of_5
camunda_webapps_1748937221_8.8.0_part_2_of_5
camunda_webapps_1748937221_8.8.0_part_3_of_5
camunda_webapps_1748937221_8.8.0_part_4_of_5
camunda_webapps_1748937221_8.8.0_part_5_of_5
camunda_zeebe_records_backup_1748937221
```

Ensure that all your backups correspond to the same backup ID and that each one is restored one-by-one.
