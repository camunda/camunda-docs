---
id: data-retention
sidebar_label: Data retention
title: Configure data retention
description: "Learn how to configure data retention policies in Camunda 8.8 Helm charts to automatically manage and delete old data."
---

Data retention policies automatically delete old data from Elasticsearch or OpenSearch after a specified time period. This prevents unlimited data growth, reduces storage costs, and maintains system performance by using Index Lifecycle Management (ILM) for Elasticsearch or Index State Management (ISM) for OpenSearch.

:::tip Best practice
**Configure data retention during initial installation.** Adding retention configuration after deployment may require manual policy creation in Elasticsearch/OpenSearch. See [Differences from previous versions](#differences-from-previous-versions) for version-specific behavior.
:::

### Prerequisites

- Camunda 8.8+ Helm chart deployment
- Elasticsearch 7+ or OpenSearch 2.5+
- Access to modify your `values.yaml` file

### Configuration

Configure retention policies in your `values.yaml` file under the `orchestration` section.

**Retention policy types:**

1. **Zeebe records** (`orchestration.retention`) - Retention for Zeebe record indices
1. **Historical data** (`orchestration.history.retention`) - Retention for archived Operate, Tasklist, and Camunda indices

:::caution Zeebe records retention requirements
The `orchestration.retention` configuration requires the **legacy Zeebe Elasticsearch/OpenSearch exporter** to be enabled.

The legacy Zeebe exporter is automatically enabled when:

- `orchestration.exporters.zeebe.enabled: true` is set, OR
- Optimize is enabled (`optimize.enabled: true`), OR
- Data migration is enabled (`orchestration.migration.data.enabled: true`)

**In Camunda 8.8, `orchestration.exporters.zeebe.enabled` defaults to `false`.** If you need Zeebe record retention without Optimize, you must explicitly enable it.
:::

#### Parameters

**Zeebe records retention parameters:**

| Key                                  | Type    | Default                         | Description                                                                                                                                                                                               |
| ------------------------------------ | ------- | ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `orchestration.retention.enabled`    | boolean | `false`                         | If `true`, creates and applies the ILM/ISM policy to Zeebe record indices. **Requires the legacy Zeebe exporter to be enabled** (see prerequisites above).                                                |
| `orchestration.retention.minimumAge` | string  | `30d`                           | How old the data must be before deletion. Uses [Elasticsearch TimeUnit format](https://www.elastic.co/guide/en/elasticsearch/reference/current/api-conventions.html#time-units) (e.g., `30d`, `7d`, `1h`) |
| `orchestration.retention.policyName` | string  | `zeebe-record-retention-policy` | Name of the ILM/ISM policy to create and apply                                                                                                                                                            |

**History archiving and retention parameters:**

| Key                                                      | Type    | Default                                  | Description                                                                                                    |
| -------------------------------------------------------- | ------- | ---------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `orchestration.history.waitPeriodBeforeArchiving`        | string  | `1h`                                     | Grace period before archiving completed processes. Processes finished within this window are not yet archived. |
| `orchestration.history.rolloverInterval`                 | string  | `1d`                                     | Time range for creating dated indices (e.g., `1d` creates daily indices).                                      |
| `orchestration.history.rolloverBatchSize`                | integer | `100`                                    | Maximum number of process instances per archiving batch                                                        |
| `orchestration.history.elsRolloverDateFormat`            | string  | `date`                                   | Date format for historical indices in Java DateTimeFormatter syntax                                            |
| `orchestration.history.delayBetweenRuns`                 | integer | `2000`                                   | Millisecond interval between archiver runs                                                                     |
| `orchestration.history.maxDelayBetweenRuns`              | integer | `60000`                                  | Maximum millisecond interval between archiver runs due to failure backoffs                                     |
| `orchestration.history.retention.enabled`                | boolean | `false`                                  | If `true`, applies ILM/ISM policy to archived orchestration indices (Operate, Tasklist, Camunda)               |
| `orchestration.history.retention.minimumAge`             | string  | `30d`                                    | How old archived data must be before deletion                                                                  |
| `orchestration.history.retention.policyName`             | string  | `camunda-history-retention-policy`       | Name of the ILM/ISM policy for historical data                                                                 |
| `orchestration.history.retention.usageMetricsMinimumAge` | string  | `730d`                                   | Retention period for usage metrics indices (2 years by default)                                                |
| `orchestration.history.retention.usageMetricsPolicyName` | string  | `camunda-usage-metrics-retention-policy` | Name of the ILM/ISM policy for usage metrics                                                                   |

#### Example usage

**Basic configuration (with Optimize):**

Optimize automatically enables the legacy Zeebe exporter:

```yaml
optimize:
  enabled: true
```

**Without Optimize:**

Explicitly enable the legacy Zeebe exporter:

```yaml
orchestration:
  exporters:
    zeebe:
      enabled: true # Required for Zeebe record retention
```

**Retention configuration:**

Both scenarios use the same retention configuration:

```yaml
orchestration:
  # Zeebe records retention
  retention:
    enabled: true
    minimumAge: 30d
    policyName: zeebe-record-retention-policy

  # Historical data archiving and retention
  history:
    waitPeriodBeforeArchiving: 1h
    rolloverInterval: 1d
    rolloverBatchSize: 100
    elsRolloverDateFormat: date
    delayBetweenRuns: 2000
    maxDelayBetweenRuns: 60000
    retention:
      enabled: true
      minimumAge: 30d
      policyName: camunda-history-retention-policy
      usageMetricsMinimumAge: 730d
      usageMetricsPolicyName: camunda-usage-metrics-retention-policy
```

### Troubleshooting

#### Verifying retention policies

After deploying with retention enabled, verify that the ILM/ISM policies were created successfully.

**Zeebe records retention (`zeebe-record-retention-policy`):**  
Created automatically by the Zeebe Elasticsearch/OpenSearch exporter during initialization, typically within a few minutes of deployment. This policy is applied to runtime Zeebe record indices (e.g., `zeebe-record-*`).

**History retention (`camunda-history-retention-policy`):**  
Created automatically by Camunda's retention tooling when `orchestration.history.retention.enabled: true`. The archiver will:

1. Create the ILM/ISM policy with the configured `minimumAge` setting when retention is first enabled
1. Wait for `waitPeriodBeforeArchiving` (default: 1 hour) after a process instance completes
1. Archive completed instances to dated indices (e.g., `operate-process-8.3.0_2024-01-15`, `tasklist-task-8.8.0_2024-01-15`)
1. Attach the policy directly to each archived index as it is created

The policy applies directly to archived Operate, Tasklist, and Camunda indices (not via index templates). If `minimumAge` is set very low (e.g., `0s`), Elasticsearch may immediately delete newly created archived indices because the policy takes effect at creation time.

:::note Policy creation timing
The `camunda-history-retention-policy` is created by Camunda's retention tooling as part of the archiving workflow. If you query for this policy before any archiving occurs, you may receive a 404 response. The policy is created when the first archived index is created.
:::

**Set your database URL:**

```bash
export DATABASE_URL="https://your-database-host:9200"
```

Replace `your-database-host` with your Elasticsearch or OpenSearch hostname.

**Check if policies exist:**

For **Elasticsearch**:

```bash
curl -X GET "${DATABASE_URL}/_ilm/policy/zeebe-record-retention-policy?pretty"
curl -X GET "${DATABASE_URL}/_ilm/policy/camunda-history-retention-policy?pretty"
```

For **OpenSearch**:

```bash
curl -X GET "${DATABASE_URL}/_plugins/_ism/policies/zeebe-record-retention-policy?pretty"
curl -X GET "${DATABASE_URL}/_plugins/_ism/policies/camunda-history-retention-policy?pretty"
```

Expected response for a policy with 30-day retention:

```json
{
  "zeebe-record-retention-policy": {
    "version": 1,
    "modified_date": "2025-01-15T10:30:00.000Z",
    "policy": {
      "phases": {
        "delete": {
          "min_age": "30d",
          "actions": {
            "delete": {}
          }
        }
      }
    }
  }
}
```

**Check if archived indices exist:**

```bash
curl -X GET "${DATABASE_URL}/_cat/indices/operate-*_20*?v"
curl -X GET "${DATABASE_URL}/_cat/indices/tasklist-*_20*?v"
```

Archived indices follow the pattern: `{component}-{type}-{schema-version}_{date}`  
Examples:

- `operate-process-8.3.0_2024-01-15`
- `operate-variable-8.3.0_2024-01-15`
- `tasklist-task-8.8.0_2024-01-15`

:::note Index versioning
The version number in index names (e.g., `8.3.0`) represents the **schema version**, not necessarily the Camunda platform version. Schema versions evolve independently as index structures change. For details, see [Operate schema and migration documentation](/self-managed/components/orchestration-cluster/core-settings/concepts/schema-and-migration.md).
:::

If no archived indices exist:

- No processes have completed and been archived yet
- The `waitPeriodBeforeArchiving` period hasn't elapsed
- Deploy and complete a test process, then wait for archiving to occur

**Check if retention policy is applied to an archived index:**

For **Elasticsearch**:

```bash
curl -X GET "${DATABASE_URL}/operate-process-8.3.0_2024-01-15/_settings?pretty" | grep -A 3 lifecycle
```

For **OpenSearch**:

```bash
curl -X GET "${DATABASE_URL}/_plugins/_ism/explain/operate-process-8.3.0_2024-01-15?pretty"
```

Expected output showing the policy is attached:

```json
{
  "index.lifecycle.name": "camunda-history-retention-policy"
}
```

#### Manually creating or updating policies (8.7 and earlier)

For Camunda 8.8+, policies are created automatically by the retention tooling. If you need to manually create or update policies, use the policy names configured in your `values.yaml` with the commands in the [Camunda 8.7 manual policy management guide](/versioned_docs/version-8.7/self-managed/setup/guides/data-retention.md#manual-policy-management).

**Camunda 8.8 default policy names** (customizable via Helm values):

- `zeebe-record-retention-policy` - For Zeebe record indices (configured via `orchestration.retention.policyName`)
- `camunda-history-retention-policy` - For historical Operate, Tasklist, and Camunda indices (configured via `orchestration.history.retention.policyName`)
- `camunda-usage-metrics-retention-policy` - For usage metrics indices (configured via `orchestration.history.retention.usageMetricsPolicyName`)

**Camunda 8.7 default policy names** (only Zeebe is customizable):

- `zeebe-record-retention-policy` - For Zeebe records (customizable via `zeebe.retention.policyName`)
- `operate_delete_archived_indices` - For Operate indices (hardcoded)
- `tasklist_delete_archived_indices` - For Tasklist indices (hardcoded)

The curl commands for creating and applying policies are the same across versions—only the policy names differ. See the [8.7 guide's manual policy section](/versioned_docs/version-8.7/self-managed/setup/guides/data-retention.md#manual-policy-management) for complete ILM and ISM policy creation commands.

#### Known limitations

**OpenSearch policy updates:**

When using OpenSearch, updating an existing ISM policy's `minimumAge` may not take effect automatically. OpenSearch requires the `seq_no` and `primary_term` parameters during policy updates to ensure proper version control. Without these parameters, policy updates may fail or be skipped.

**To update an OpenSearch policy:**

1. Get the current policy with its version information
1. Update the policy using the `seq_no` and `primary_term` from the current version
1. Verify the updated policy reflects the new `minimumAge`

See the [OpenSearch ISM API documentation](https://opensearch.org/docs/latest/im-plugin/ism/api/) for details on policy version parameters.

**Elasticsearch bulk operations:**

When applying retention policies to a large number of existing indices, the operation may fail due to HTTP line length limits in Elasticsearch. This typically occurs when using wildcard patterns to apply settings to many indices at once (e.g., `operate-*`, `tasklist-*`).

**Workarounds:**

- Apply settings to smaller batches of indices using more specific patterns
- Apply settings to individual indices when the number of indices is very large
- Use index templates for future indices instead of retroactively applying to all indices

**Policy timing considerations:**

The `camunda-history-retention-policy` is created by Camunda's retention tooling as part of the archiving workflow. If you query for this policy immediately after deployment and before any archiving occurs, you may receive a 404 response. The policy is created when the first archived index is created by the archiver.

:::note Index naming
Operate and Tasklist indices use schema-specific versioning in their names (e.g., `operate-process-8.3.0_`, `tasklist-task-8.8.0_`). The version numbers represent schema versions, which may differ from the Camunda platform version. When archived, these indices receive a date suffix (e.g., `operate-process-8.3.0_2024-01-15`).
:::

### References

**Related Camunda documentation:**

- [Configure Helm chart components](./application-configs.md) - How to use `orchestration.configuration` for advanced settings
- [Upgrade from 8.7 to 8.8](/self-managed/upgrade/helm/helm-870-880.md) - Version upgrade guidance
- [Zeebe Elasticsearch Exporter retention](/self-managed/components/orchestration-cluster/zeebe/exporters/elasticsearch-exporter.md#retention) - Legacy Zeebe exporter retention settings
- [Zeebe Camunda Exporter](/self-managed/components/orchestration-cluster/zeebe/exporters/camunda-exporter.md) - Camunda exporter configuration (controls `orchestration.history.*` settings)
  - [History archiving settings](/self-managed/components/orchestration-cluster/zeebe/exporters/camunda-exporter.md?configuration=history#options) - Archiving and rollover configuration
  - [Retention settings](/self-managed/components/orchestration-cluster/zeebe/exporters/camunda-exporter.md?configuration=retention#options) - Historical data retention policies
- [Operate data retention](/self-managed/components/orchestration-cluster/core-settings/concepts/data-retention.md) - Operate-specific retention behavior
- [Tasklist data retention](/self-managed/components/orchestration-cluster/core-settings/concepts/data-retention.md) - Tasklist-specific retention behavior

**External documentation:**

- [Elasticsearch ILM documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/index-lifecycle-management.html) - Official Elasticsearch ILM guide
- [Elasticsearch TimeUnit format](https://www.elastic.co/guide/en/elasticsearch/reference/current/api-conventions.html#time-units) - Valid time unit values
- [OpenSearch ISM documentation](https://opensearch.org/docs/latest/im-plugin/ism/index/) - Official OpenSearch ISM guide
- [Helm values documentation](https://helm.sh/docs/chart_template_guide/values_files/) - Working with Helm values files

### Differences from previous versions

**Camunda 8.8:**

- **Policy creation and attachment**: Policies are created automatically by retention tooling and attached to archived indices as they are created
- **Unified history retention**: Historical data retention (Operate, Tasklist, Camunda indices) uses unified `orchestration.history.retention` configuration
- **Zeebe record retention**: Legacy zeebe-record indices remain under exporter-specific configuration (`orchestration.retention`)
- **OpenSearch policy updates**: Updating existing ISM policies requires `seq_no` and `primary_term` parameters; without them, updates may fail and require manual intervention
- **Bulk operations**: Applying settings to many indices may fail due to HTTP line length limits, requiring batching or manual workarounds

**Camunda 8.7 and earlier:**

- **Operate**: Creates ILM policy when enabled, but configuration updates (e.g., changing `minimumAge`) are not applied automatically - manual policy updates required
- **Zeebe**: Creates policies on initial install and applies ILM configuration updates automatically
- **Tasklist**: Does not apply ILM configuration updates after deployment - manual policy updates required
- **Versions 8.5-8.6**: ILM policies sometimes missing after configuration; may require manual creation or new record export to trigger policy creation

:::info
For Camunda 8.7 and earlier, if you change retention configuration after initial deployment, you must manually update the policies in Elasticsearch/OpenSearch for Operate and Tasklist. Zeebe automatically applies configuration updates. See [Manually creating or updating policies](#manually-creating-or-updating-policies-87-and-earlier).
:::
