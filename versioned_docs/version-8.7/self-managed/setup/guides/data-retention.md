---
id: data-retention
sidebar_label: Data retention
title: Configure data retention
description: "Learn how to configure data retention policies in Camunda 8.7 Helm charts to automatically manage and delete old data."
---

Data retention policies automatically delete old data from Elasticsearch or OpenSearch after a specified time period. This prevents unlimited data growth, reduces storage costs, and maintains system performance by using Index Lifecycle Management (ILM) for Elasticsearch or Index State Management (ISM) for OpenSearch.

:::caution Manual policy management required
In Camunda 8.7, retention policy configuration updates often require **manual intervention** in Elasticsearch/OpenSearch. Zeebe automatically applies configuration updates, but Operate and Tasklist do not. See [Known limitations](#known-limitations) for details.

:::info Dated indices only
Retention policies apply **only to dated indices** (indices with date suffixes like `operate-list-view-2024.01.15`). Main operational indices without date suffixes are never deleted by retention policies.
:::

## Prerequisites

- Camunda 8.7 Helm chart deployment
- Elasticsearch 7+ or OpenSearch 2.5+
- Access to modify your `values.yaml` file
- Access to Elasticsearch/OpenSearch API for manual policy management

## Configuration

Configure retention policies in your `values.yaml` file under each component section.

**Available retention configurations:**

1. **Zeebe records** (`zeebe.retention`) - Retention for Zeebe record indices
1. **Operate data** (`operate.retention`) - Retention for Operate indices
1. **Tasklist data** (`tasklist.retention`) - Retention for Tasklist indices

### Parameters

**Zeebe retention parameters:**

| Key                          | Type    | Default                         | Description                                                                                                                                                                                               |
| ---------------------------- | ------- | ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `zeebe.retention.enabled`    | boolean | `false`                         | If `true`, creates and applies the ILM/ISM policy to Zeebe record indices.                                                                                                                                |
| `zeebe.retention.minimumAge` | string  | `30d`                           | How old the data must be before deletion. Uses [Elasticsearch TimeUnit format](https://www.elastic.co/guide/en/elasticsearch/reference/current/api-conventions.html#time-units) (e.g., `30d`, `7d`, `1h`) |
| `zeebe.retention.policyName` | string  | `zeebe-record-retention-policy` | Name of the ILM/ISM policy to create and apply                                                                                                                                                            |

**Operate retention parameters:**

| Key                            | Type    | Default | Description                                                                                                                                                                                               |
| ------------------------------ | ------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `operate.retention.enabled`    | boolean | `false` | If `true`, creates and applies the ILM/ISM policy to Operate indices.                                                                                                                                     |
| `operate.retention.minimumAge` | string  | `30d`   | How old the data must be before deletion. Uses [Elasticsearch TimeUnit format](https://www.elastic.co/guide/en/elasticsearch/reference/current/api-conventions.html#time-units) (e.g., `30d`, `7d`, `1h`) |

**Tasklist retention parameters:**

| Key                             | Type    | Default | Description                                                                                                                                                                                               |
| ------------------------------- | ------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `tasklist.retention.enabled`    | boolean | `false` | If `true`, creates and applies the ILM/ISM policy to Tasklist indices.                                                                                                                                    |
| `tasklist.retention.minimumAge` | string  | `30d`   | How old the data must be before deletion. Uses [Elasticsearch TimeUnit format](https://www.elastic.co/guide/en/elasticsearch/reference/current/api-conventions.html#time-units) (e.g., `30d`, `7d`, `1h`) |

### Example configuration

```yaml
zeebe:
  retention:
    enabled: true
    minimumAge: 30d
    policyName: zeebe-record-retention-policy

operate:
  retention:
    enabled: true
    minimumAge: 30d

tasklist:
  retention:
    enabled: true
    minimumAge: 30d
```

## Manual policy management

In Camunda 8.7, changing retention configuration after initial deployment requires manual policy updates in Elasticsearch/OpenSearch for Operate and Tasklist. Zeebe automatically applies configuration updates.

:::note Policy creation timing

- **Zeebe**: Creates or updates its policy on the **first record export** after enabling retention (e.g., when a process instance is created or a task is completed)
- **Operate/Tasklist**: Create policies automatically **only if retention is configured at initial install**. If you enable retention after deployment, you must manually create and apply the policy to dated indices
  :::

### When manual intervention is required

You need to manually update policies when:

- **Changing `minimumAge`** after initial deployment for Operate or Tasklist
- **Enabling retention** after initial deployment for Operate or Tasklist (requires manual policy creation and application to dated indices)
- **Policy is missing** despite configuration being enabled

**Set your database URL:**

```bash
export DATABASE_URL="https://your-database-host:9200"
```

Replace `your-database-host` with your Elasticsearch or OpenSearch hostname.

### Creating and updating ILM policies (Elasticsearch)

#### Check if policy exists

```bash
curl -X GET "${DATABASE_URL}/_ilm/policy/**<POLICY_NAME>**?pretty"
```

**Replace `<POLICY_NAME>` with one of:**

- `zeebe-record-retention-policy` - for Zeebe
- `operate_delete_archived_indices` - for Operate
- `tasklist_delete_archived_indices` - for Tasklist

#### Create or update policy

If the policy doesn't exist or needs updating:

```bash
curl -X PUT "${DATABASE_URL}/_ilm/policy/**<POLICY_NAME>**" \
  -H 'Content-Type: application/json' \
  -d '{
    "policy": {
      "phases": {
        "delete": {
          "min_age": "**<RETENTION_PERIOD>**",
          "actions": {
            "delete": {}
          }
        }
      }
    }
  }'
```

**Replace:**

- `<POLICY_NAME>` - see policy names above
- `<RETENTION_PERIOD>` - the `minimumAge` value from your Helm values (e.g., `30d`)

#### Apply policy to existing indices

:::info Dated indices only
Apply retention policies **only to dated indices** (indices with date suffixes). Do not apply to main operational indices.
:::

```bash
curl -X PUT "${DATABASE_URL}/**<INDEX_PATTERN>**/_settings" \
  -H 'Content-Type: application/json' \
  -d '{
    "index.lifecycle.name": "**<POLICY_NAME>**"
  }'
```

**Replace:**

- `<INDEX_PATTERN>` with dated index patterns:
  - `zeebe-record-*` - for Zeebe dated indices
  - `operate-*-<date>` or `operate-list-view-*` - for Operate dated indices
  - `tasklist-*-<date>` - for Tasklist dated indices
- `<POLICY_NAME>` - see policy names above

### Creating and updating ISM policies (OpenSearch)

#### Check if policy exists

```bash
curl -X GET "${DATABASE_URL}/_plugins/_ism/policies/**<POLICY_NAME>**?pretty"
```

**Replace `<POLICY_NAME>` with one of:**

- `zeebe-record-retention-policy` - for Zeebe
- `operate_delete_archived_indices` - for Operate
- `tasklist_delete_archived_indices` - for Tasklist

#### Create or update policy

```bash
curl -X PUT "${DATABASE_URL}/_plugins/_ism/policies/**<POLICY_NAME>**" \
  -H 'Content-Type: application/json' \
  -d '{
    "policy": {
      "description": "**<COMPONENT>** retention policy",
      "default_state": "active",
      "states": [
        {
          "name": "active",
          "actions": [],
          "transitions": [
            {
              "state_name": "delete",
              "conditions": {
                "min_index_age": "**<RETENTION_PERIOD>**"
              }
            }
          ]
        },
        {
          "name": "delete",
          "actions": [
            {
              "delete": {}
            }
          ],
          "transitions": []
        }
      ]
    }
  }'
```

**Replace:**

- `<POLICY_NAME>` - see policy names above
- `<COMPONENT>` - the component name (Zeebe, Operate, or Tasklist)
- `<RETENTION_PERIOD>` - the `minimumAge` value from your Helm values (e.g., `30d`)

#### Apply policy to existing indices

:::info Dated indices only
Apply retention policies **only to dated indices** (indices with date suffixes). Do not apply to main operational indices.
:::

```bash
curl -X POST "${DATABASE_URL}/_plugins/_ism/add/**<INDEX_PATTERN>**" \
  -H 'Content-Type: application/json' \
  -d '{
    "policy_id": "**<POLICY_NAME>**"
  }'
```

**Replace:**

- `<INDEX_PATTERN>` with dated index patterns:
  - `zeebe-record-*` - for Zeebe dated indices
  - `operate-*-<date>` or `operate-list-view-*` - for Operate dated indices
  - `tasklist-*-<date>` - for Tasklist dated indices
- `<POLICY_NAME>` - see policy names above

## Verification

### Verify policies are created

**Elasticsearch:**

```bash
curl -X GET "${DATABASE_URL}/_ilm/policy/**<POLICY_NAME>**?pretty"
```

**OpenSearch:**

```bash
curl -X GET "${DATABASE_URL}/_plugins/_ism/policies/**<POLICY_NAME>**?pretty"
```

**Replace `<POLICY_NAME>` with the appropriate policy name** for the component you want to verify (see policy names listed above).

Expected response for an Elasticsearch ILM policy with 30-day retention:

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

### Verify policy is applied to indices

**Elasticsearch:**

```bash
curl -X GET "${DATABASE_URL}/**<INDEX_PATTERN>**/_settings?pretty" | grep -A 3 lifecycle
```

**OpenSearch:**

```bash
curl -X GET "${DATABASE_URL}/_plugins/_ism/explain/**<INDEX_PATTERN>**?pretty"
```

**Replace `<INDEX_PATTERN>` with the appropriate pattern** for the component you want to verify (e.g., `zeebe-record-*`, `operate-*`, `tasklist-*`).

Expected output showing the policy is attached:

```json
{
  "index.lifecycle.name": "zeebe-record-retention-policy"
}
```

## Known limitations

### Operate and Tasklist policy updates

**Operate** and **Tasklist** do not automatically apply retention configuration updates after initial deployment. When you change `minimumAge` or other retention settings in your `values.yaml`:

1. The Helm chart updates the component configuration
1. The component **does not** automatically update the policy in Elasticsearch/OpenSearch
1. You must manually update the policy using the commands in [Manual policy management](#manual-policy-management)

**Workaround:** Manually update policies when changing retention configuration for Operate or Tasklist.

### Zeebe automatic updates

**Zeebe** automatically applies retention configuration updates. When you change `zeebe.retention.minimumAge` in your `values.yaml` and upgrade the Helm release, Zeebe will update the policy in Elasticsearch/OpenSearch.

### Policy creation in versions 8.5-8.6

In Camunda versions 8.5-8.6, ILM policies may be missing after configuration, even when `enabled: true`. This may require:

- Manual policy creation
- Triggering new record export to initiate policy creation
- Restarting the affected component

**Workaround:** Manually create missing policies using the commands in [Manual policy management](#manual-policy-management).

### OpenSearch policy update requirements

When using OpenSearch, updating an existing ISM policy's `minimumAge` may not take effect automatically. OpenSearch requires the `seq_no` and `primary_term` parameters during policy updates to ensure proper version control.

**To update an OpenSearch policy:**

1. Get the current policy with its version information:

```bash
curl -X GET "${DATABASE_URL}/_plugins/_ism/policies/zeebe-record-retention-policy?pretty"
```

2. Note the `_seq_no` and `_primary_term` values from the response

3. Update the policy using these parameters:

```bash
curl -X PUT "${DATABASE_URL}/_plugins/_ism/policies/zeebe-record-retention-policy?if_seq_no=<SEQ_NO>&if_primary_term=<PRIMARY_TERM>" \
  -H 'Content-Type: application/json' \
  -d '{
    "policy": {
      "description": "Zeebe record retention policy",
      "default_state": "active",
      "states": [
        {
          "name": "active",
          "actions": [],
          "transitions": [
            {
              "state_name": "delete",
              "conditions": {
                "min_index_age": "60d"
              }
            }
          ]
        },
        {
          "name": "delete",
          "actions": [
            {
              "delete": {}
            }
          ],
          "transitions": []
        }
      ]
    }
  }'
```

Replace `<SEQ_NO>` and `<PRIMARY_TERM>` with the actual values from step 2.

See the [OpenSearch ISM API documentation](https://opensearch.org/docs/latest/im-plugin/ism/api/) for details.

### Bulk operations limitations

When applying retention policies to a large number of existing indices, the operation may fail due to HTTP line length limits in Elasticsearch. This typically occurs when using wildcard patterns to apply settings to many indices at once (e.g., `operate-*`, `tasklist-*`).

**Workarounds:**

- Apply settings to smaller batches of indices using more specific patterns
- Apply settings to individual indices when the number of indices is very large
- Use index templates for future indices instead of retroactively applying to all indices

## References

**Camunda documentation:**

- [Zeebe Elasticsearch Exporter retention](/self-managed/zeebe-deployment/exporters/elasticsearch-exporter.md#retention) - Component-level retention details
- [Zeebe OpenSearch Exporter retention](/self-managed/zeebe-deployment/exporters/opensearch-exporter.md#retention) - OpenSearch exporter configuration
- [Helm chart secret management](./secret-management.md) - Managing secrets in Helm deployments
- [Using existing Elasticsearch](./using-existing-elasticsearch.md) - Connecting to external Elasticsearch
- [Using existing OpenSearch](./using-existing-opensearch.md) - Connecting to external OpenSearch

**External documentation:**

- [Elasticsearch ILM documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/index-lifecycle-management.html) - Official Elasticsearch ILM guide
- [Elasticsearch TimeUnit format](https://www.elastic.co/guide/en/elasticsearch/reference/current/api-conventions.html#time-units) - Valid time unit values
- [OpenSearch ISM documentation](https://opensearch.org/docs/latest/im-plugin/ism/index/) - Official OpenSearch ISM guide
- [Helm values documentation](https://helm.sh/docs/chart_template_guide/values_files/) - Working with Helm values files
