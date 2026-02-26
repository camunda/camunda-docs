import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Data

<Tabs>
  <TabItem value="application.yaml" label="Application properties">

### `camunda.data`

| Property                                    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Default value |
| :------------------------------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------ |
| `camunda.data.snapshot-period`              | <p>How often snapshots are taken of streams (in minutes).</p>                                                                                                                                                                                                                                                                                                                                                                                                            | `5m`          |
| `camunda.data.export.distribution-interval` | <p>Configures the rate at which exporter positions are distributed to the followers. This is useful for fail-over and taking snapshots.</p><p>The follower is able to take snapshots based on replayed and distributed export position. When a follower takes over it can recover from the snapshot, it doesn't need to replay and export everything.</p><p>For example, it can start from the last exported position it has received by the distribution mechanism.</p> | `15s`         |
| `camunda.data.export.skip-records`          | <p>Enable the exporters to skip record position. Allows to skip certain records by their position.</p><p>This is useful for debugging or skipping a record that is preventing processing or exporting to continue.</p><p>Record positions defined to skip in this definition will be skipped in all exporters. The value is a comma-separated list of records ids to skip. Whitespace is ignored.</p>                                                                    | `[]`          |

### `camunda.data.audit-log`

| Property                                   | Description                                                                                                 | Default value                  |
| :----------------------------------------- | :---------------------------------------------------------------------------------------------------------- | :----------------------------- |
| `camunda.data.audit-log.enabled`           | <p>Enable or disable the audit log.</p>                                                                     | `true`                         |
| `camunda.data.audit-log.user.categories`   | <p>List of audit log categories to include for <strong>user</strong>-initiated actions.</p>                 | `[OPERATOR, USER_TASK, ADMIN]` |
| `camunda.data.audit-log.user.excludes`     | <p>List of users to exclude from audit logging.</p>                                                         |                                |
| `camunda.data.audit-log.client.categories` | <p>List of audit log categories to include for <strong>client</strong>-initiated actions (API clients).</p> | `[OPERATOR, USER_TASK, ADMIN]` |
| `camunda.data.audit-log.client.excludes`   | <p>List of clients to exclude from audit logging.</p>                                                       |                                |

</TabItem>
  <TabItem value="env" label="Environment variables">

### `CAMUNDA_DATA`

| Property                                   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Default value |
| :----------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------ |
| `CAMUNDA_DATA_SNAPSHOTPERIOD`              | <p>How often snapshots are taken of streams (in minutes).</p>                                                                                                                                                                                                                                                                                                                                                                                                            | `5m`          |
| `CAMUNDA_DATA_EXPORT_DISTRIBUTIONINTERVAL` | <p>Configures the rate at which exporter positions are distributed to the followers. This is useful for fail-over and taking snapshots.</p><p>The follower is able to take snapshots based on replayed and distributed export position. When a follower takes over it can recover from the snapshot, it doesn't need to replay and export everything.</p><p>For example, it can start from the last exported position it has received by the distribution mechanism.</p> | `15s`         |
| `CAMUNDA_DATA_EXPORT_SKIPRECORDS`          | <p>Enable the exporters to skip record position. Allows to skip certain records by their position.</p><p>This is useful for debugging or skipping a record that is preventing processing or exporting to continue.</p><p>Record positions defined to skip in this definition will be skipped in all exporters. The value is a comma-separated list of records ids to skip. Whitespace is ignored.</p>                                                                    | `[]`          |

### `CAMUNDA_DATA_AUDITLOG`

| Property                                  | Description                                                                                                 | Default value                  |
| :---------------------------------------- | :---------------------------------------------------------------------------------------------------------- | :----------------------------- |
| `CAMUNDA_DATA_AUDITLOG_ENABLED`           | <p>Enable or disable the audit log.</p>                                                                     | `true`                         |
| `CAMUNDA_DATA_AUDITLOG_USER_CATEGORIES`   | <p>List of audit log categories to include for <strong>user</strong>-initiated actions.</p>                 | `[OPERATOR, USER_TASK, ADMIN]` |
| `CAMUNDA_DATA_AUDITLOG_USER_EXCLUDES`     | <p>List of users to exclude from audit logging.</p>                                                         |                                |
| `CAMUNDA_DATA_AUDITLOG_CLIENT_CATEGORIES` | <p>List of audit log categories to include for <strong>client</strong>-initiated actions (API clients).</p> | `[OPERATOR, USER_TASK, ADMIN]` |
| `CAMUNDA_DATA_AUDITLOG_CLIENT_EXCLUDES`   | <p>List of clients to exclude from audit logging.</p>                                                       |                                |

  </TabItem>
</Tabs>
