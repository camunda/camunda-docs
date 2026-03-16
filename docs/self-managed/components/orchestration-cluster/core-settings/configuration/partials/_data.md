import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Data

<Tabs groupId="configType" defaultValue="application.yaml">
  <TabItem value="application.yaml" label="Application properties">

### `camunda.data`

| Property                                    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Default value |
| :------------------------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------ |
| `camunda.data.snapshot-period`              | <p>How often snapshots are taken of streams (in minutes).</p>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | `5m`          |
| `camunda.data.export.distribution-interval` | <p>Configures the rate at which exporter positions are distributed to the followers. This is useful for fail-over and taking snapshots.</p><p>The follower is able to take snapshots based on replayed and distributed export position. When a follower takes over it can recover from the snapshot, it doesn't need to replay and export everything.</p><p>For example, it can start from the last exported position it has received by the distribution mechanism.</p>                                                                                                                  | `15s`         |
| `camunda.data.export.skip-records`          | <p>Enable the exporters to skip record position. Allows to skip certain records by their position, per partition.</p><p>This is useful for debugging or skipping a record that is preventing processing or exporting to continue.</p><p>Record positions defined to skip in this definition will be skipped in all exporters. The value is a partitionId keyed map with a comma-separated list of positions to skip. Whitespace is ignored. For example:</p><p><pre><code>camunda.data.export.skip-records.1: 12345, 67890<br/>camunda.data.export.skip-records.2: 54321</code></pre></p> | `{}`          |

### `camunda.data.audit-log`

| Property                                   | Description                                                                                                      | Default value                             |
| :----------------------------------------- | :--------------------------------------------------------------------------------------------------------------- | :---------------------------------------- |
| `camunda.data.audit-log.enabled`           | Enable or disable the audit log.                                                                                 | `true`                                    |
| `camunda.data.audit-log.user.categories`   | List of audit log categories to include for user-initiated actions.                                              | `[ADMIN, DEPLOYED_RESOURCES, USER_TASKS]` |
| `camunda.data.audit-log.user.excludes`     | List of [audit log entity types](#audit-log-entity-types) to exclude for user-initiated actions.                 | `[]`                                      |
| `camunda.data.audit-log.client.categories` | List of audit log categories to include for client-initiated actions (API clients).                              | `[]`                                      |
| `camunda.data.audit-log.client.excludes`   | List of [audit log entity types](#audit-log-entity-types) to exclude for client-initiated actions (API clients). | `[]`                                      |

</TabItem>
<TabItem value="env" label="Environment variables">

### `CAMUNDA_DATA`

| Property                                   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Default value |
| :----------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------ |
| `CAMUNDA_DATA_SNAPSHOTPERIOD`              | <p>How often snapshots are taken of streams (in minutes).</p>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | `5m`          |
| `CAMUNDA_DATA_EXPORT_DISTRIBUTIONINTERVAL` | <p>Configures the rate at which exporter positions are distributed to the followers. This is useful for fail-over and taking snapshots.</p><p>The follower is able to take snapshots based on replayed and distributed export position. When a follower takes over it can recover from the snapshot, it doesn't need to replay and export everything.</p><p>For example, it can start from the last exported position it has received by the distribution mechanism.</p>                                                                                               | `15s`         |
| `CAMUNDA_DATA_EXPORT_SKIPRECORDS`          | <p>Enable the exporters to skip record position. Allows to skip certain records by their position.</p><p>This is useful for debugging or skipping a record that is preventing processing or exporting to continue.</p><p>Record positions defined to skip in this definition will be skipped in all exporters. The value is a partitionId keyed map with a comma-separated list of positions to skip. Whitespace is ignored. For example:</p><p><pre><code>CAMUNDA_DATA_EXPORT_SKIPRECORDS_1=12345, 67890<br/>CAMUNDA_DATA_EXPORT_SKIPRECORDS_2=54321</code></pre></p> | `{}`          |

### `CAMUNDA_DATA_AUDITLOG`

| Property                                  | Description                                                                                                      | Default value                             |
| :---------------------------------------- | :--------------------------------------------------------------------------------------------------------------- | :---------------------------------------- |
| `CAMUNDA_DATA_AUDITLOG_ENABLED`           | Enable or disable the audit log.                                                                                 | `true`                                    |
| `CAMUNDA_DATA_AUDITLOG_USER_CATEGORIES`   | List of audit log categories to include for user-initiated actions.                                              | `[ADMIN, DEPLOYED_RESOURCES, USER_TASKS]` |
| `CAMUNDA_DATA_AUDITLOG_USER_EXCLUDES`     | List of [audit log entity types](#audit-log-entity-types) to exclude for user-initiated actions.                 | `[]`                                      |
| `CAMUNDA_DATA_AUDITLOG_CLIENT_CATEGORIES` | List of audit log categories to include for client-initiated actions (API clients).                              | `[]`                                      |
| `CAMUNDA_DATA_AUDITLOG_CLIENT_EXCLUDES`   | List of [audit log entity types](#audit-log-entity-types) to exclude for client-initiated actions (API clients). | `[]`                                      |

</TabItem>
</Tabs>

### Audit log entity types

Here is a complete list of audit log entity types you can use to configure `camunda.data.audit-log.(user|client).excludes` or `CAMUNDA_DATA_AUDITLOG_(USER|CLIENT)_EXCLUDES`:

- `AUTHORIZATION`
- `BATCH`
- `DECISION`
- `GROUP`
- `INCIDENT`
- `MAPPING_RULE`
- `PROCESS_INSTANCE`
- `RESOURCE`
- `ROLE`
- `TENANT`
- `USER_TASK`
- `USER`
- `VARIABLE`
