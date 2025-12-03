---
id: opensearch-without-cluster-privileges
title: "OpenSearch without cluster privileges"
keywords: ["opensearch", "schema", "backup", "standalone"]
---

If the Camunda single application cannot access OpenSearch with cluster-level privileges (for example, due to restrictive IAM or fine‑grained access control policies), you can run the schema manager as a standalone application, separate from the main application.

This approach mirrors the Elasticsearch procedure, but uses OpenSearch-specific configuration and privileges. For Elasticsearch, see [Elasticsearch without cluster privileges](./elasticsearch-without-cluster-privileges.md).

## Standalone schema manager

When running the schema manager as a standalone application, cluster‑level privileges are required only during schema creation and schema settings updates. The continuously running Camunda single application then operates only with index‑level privileges.

- **Database support**: This setup is supported only for OpenSearch installations (Elasticsearch procedure uses a different configuration file section).
- **Privileges required by the single application**: The Camunda single application requires an index‑level privilege of at least `manage` on its indices to function properly (see [OpenSearch privileges](./opensearch-privileges.md)).

To run the schema manager as a standalone application:

1. [Initialize the schema manager](#initialize): Create templates, indices (as required), and apply retention / ILM (ISM) policies.
2. [Start the Camunda single application](#start): Run without cluster-level privileges using a restricted user.

### 1. Initialize the schema manager {#initialize}

The schema manager is a separate Java application responsible for creating and managing the database schema and applying index template settings (for example, shard/replica counts and retention policies).

:::note
- Initialization requires a user with cluster-level privileges (for example, an administrative role in OpenSearch with access to required action groups like `cluster_manage_index_templates`, `cluster_monitor`, and the index template CRUD permissions listed in [OpenSearch privileges](./opensearch-privileges.md)).
- Initialization needs to be executed only once per installation (and again for minor upgrades requiring schema adjustments).
:::

#### Configure the schema manager

Create a custom configuration file for the schema manager with the following values:

```yaml
camunda:
  data:
    secondary-storage:
      type: opensearch
      opensearch:
        # Example assuming an existing privileged user 'camunda-admin'
        username: camunda-admin
        password: camunda123
        url: https://localhost:9200
        # If custom SSL configuration is necessary
        security:
          enabled: true
          self-signed: true
          verify-hostname: false
          certificate-path: PATH_TO_CA_CERT
  # Optional if retention / ISM policies are enabled via schema manager
  database:
    retention:
      enabled: true
# Optional only if legacy OpenSearch exporter (pre Camunda Exporter adoption) is used
zeebe.broker.exporters.opensearch:
  class-name: io.camunda.zeebe.exporter.opensearch.OpensearchExporter
  args:
    url: https://localhost:9200
    index:
      createTemplate: true
    retention:
      enabled: true
    authentication:
      username: camunda-admin
      password: camunda123
```

For additional configuration options, review the [secondary storage configuration](/self-managed/components/orchestration-cluster/core-settings/configuration/properties.md#secondary-storage) and the [OpenSearch exporter configuration](/self-managed/components/orchestration-cluster/zeebe/exporters/opensearch-exporter.md).

#### Start the schema manager

Using the custom configuration file, start the Java application `schema` (or `schema.bat` on Windows) located in the `bin` folder of the distribution.

Assuming your configuration is saved as `schema-manager-opensearch.yaml`:

```bash
SPRING_CONFIG_ADDITIONALLOCATION=/path/to/schema-manager-opensearch.yaml ./bin/schema
```

Wait for successful completion (application exits cleanly) before moving to step 2.

### 2. Start the Camunda single application {#start}

Start the application with a less privileged OpenSearch user—only index‑level privileges (`manage` for required indices) are needed.

#### OpenSearch user with sufficient privileges

Create or reuse a user with at least the following index privileges on all Camunda indices:

- `manage` (covers create index, mappings updates, search, read, write)

You can create a role using OpenSearch Security plugin APIs (syntax may vary slightly for Amazon OpenSearch Service). Example role definition:

```bash
curl -XPUT https://localhost:9200/_plugins/_security/api/roles/camunda_read_write_role \
  -H 'Content-Type: application/json' \
  -u admin:admin \
  -d '{
    "cluster": [],
    "index": [
      {"names": ["camunda-*", "operate-*", "tasklist-*", "zeebe-*"], "privileges": ["manage"]}
    ],
    "tenant_patterns": []
  }'
```

Then assign the role to the user (example using Security plugin user API):

```bash
curl -XPUT https://localhost:9200/_plugins/_security/api/internalusers/camunda-app \
  -H 'Content-Type: application/json' \
  -u admin:admin \
  -d '{"password": "camunda123", "roles": ["camunda_read_write_role"]}'
```

#### Configure the Camunda single application

Disable schema creation in the application configuration so it reuses what the standalone schema manager prepared:

```yaml
camunda:
  data:
    secondary-storage:
      type: opensearch
      opensearch:
        # Example restricted user 'camunda-app'
        username: camunda-app
        password: camunda123
        url: https://localhost:9200
        security:
          enabled: true
          self-signed: true
          verify-hostname: false
          certificate-path: PATH_TO_CA_CERT
  database:
    schema-manager:
      createSchema: false
  # Only required for upgrades from 8.7 (legacy component configs)
  tasklist:
    zeebe-elasticsearch: # legacy key retained for backward compatibility
      username: camunda-app
      password: camunda123
      url: https://localhost:9200
      ssl:
        self-signed: true
        verify-hostname: false
        certificate-path: PATH_TO_CA_CERT
  operate:
    zeebe-elasticsearch: # legacy key retained for backward compatibility
      username: camunda-app
      password: camunda123
      url: https://localhost:9200
      ssl:
        self-signed: true
        verify-hostname: false
        certificate-path: PATH_TO_CA_CERT
zeebe.broker.exporters:
  camundaexporter:
    class-name: io.camunda.zeebe.exporter.CamundaExporter
    args:
      createSchema: false
      history:
        retention:
          enabled: true # Only if ISM retention enabled globally
  opensearch:
    class-name: io.camunda.zeebe.exporter.opensearch.OpensearchExporter
    args:
      url: https://localhost:9200
      index:
        createTemplate: false
      retention:
        enabled: false
      authentication:
        username: camunda-app
        password: camunda123
```

#### Start from the JAR distribution

```bash
SPRING_CONFIG_ADDITIONALLOCATION=/path/to/application-opensearch.yaml ./bin/camunda
```

#### Start using Helm charts

If using Helm, disable schema creation via environment variables:

```yaml
# values.yaml snippet
orchestration:
  env:
    - name: CAMUNDA_DATABASE_SCHEMAMANAGER_CREATESCHEMA
      value: "false"
    - name: CAMUNDA_TASKLIST_OPENSEARCH_HEALTHCHECKENABLED
      value: "false"
    - name: CAMUNDA_OPERATE_OPENSEARCH_HEALTHCHECKENABLED
      value: "false"
    - name: ZEEBE_BROKER_EXPORTERS_CAMUNDAEXPORTER_ARGS_CREATESCHEMA
      value: "false"
    - name: ZEEBE_BROKER_EXPORTERS_OPENSEARCH_ARGS_INDEX_CREATETEMPLATE
      value: "false"
    - name: ZEEBE_BROKER_EXPORTERS_OPENSEARCH_ARGS_RETENTION_ENABLED
      value: "false"
```

Or when managing configuration manually:

```yaml
# values.yaml snippet (manual configuration block)
orchestration:
  configuration: |
    camunda.database:
      schema-manager:
        create-schema: false
    camunda.tasklist.elasticsearch:
      health-check-enabled: false
    camunda.operate.elasticsearch:
      health-check-enabled: false
    zeebe.broker.exporters:
      camundaexporter:
        class-name: io.camunda.zeebe.exporter.CamundaExporter
        args:
          create-schema: false
      opensearch:
        class-name: io.camunda.zeebe.exporter.opensearch.OpensearchExporter
        args:
          index:
            create-template: false
          retention:
            enabled: false
```

### Minor version upgrades using the standalone schema manager {#minor-upgrades}

For a minor upgrade (N → N+1), pre-run the standalone schema manager of version N+1 with a privileged user to apply new templates/mappings. Then upgrade the application with schema creation disabled.

If the upgrade requires a data/application migration (see [Upgrade overview](/self-managed/update/administrators/overview.md)):

1. Stop or scale down the application.
2. Run schema manager (version N+1) with elevated privileges.
3. Execute migration tooling.
4. Start application at version N+1.

If no migration is required you can keep N serving traffic while running the schema manager for N+1.

### Update index settings with the standalone schema manager {#settings-updates}

You can roll out index template setting changes (shards, replicas, template priority) via the standalone schema manager without providing cluster privileges to the running application.

Supported settings (see [configuration references](/self-managed/components/orchestration-cluster/core-settings/configuration/properties.md#index--retention-settings) and [OpenSearch exporter configuration](/self-managed/components/orchestration-cluster/zeebe/exporters/opensearch-exporter.md)):

- numberOfShards (new indices only; Operate / Tasklist / Camunda / Zeebe exporter)
- numberOfReplicas (dynamic for Operate / Tasklist / Camunda; static for Zeebe exporter indices)
- templatePriority (precedence when multiple templates match)

Procedure:

1. Prepare schema manager config including updated settings (and, for Operate/Tasklist ≥8.7.11, set `updateSchemaSettings: true` if applicable).
2. Run schema manager with privileged user while application remains online.
3. Verify successful completion.

### Limitations

- Only applies to OpenSearch installations.
- Optimize support for OpenSearch is available (see release notes). However, Optimize cannot be part of this reduced-privilege single application model when it requires additional cluster features (for example advanced aggregations). Evaluate privileges before including Optimize.
- Does not remove the need for appropriate ISM permissions if retention is enabled.

## Standalone backup application

Backups (snapshot creation) require `manage_snapshots` cluster-level privilege. If the main application cannot hold this privilege, run a separate backup application using an elevated user.

- **Database support**: Supported only for OpenSearch installations in this procedure.
- **Indices covered**: Operate and Tasklist indices (Optimize indices excluded from this simplified procedure; handle separately if used).

Before running the standalone backup manager:

1. Ensure snapshot repository is configured (for example, S3, filesystem) with appropriate permissions.
2. Ensure elevated user has `manage_snapshots` and access to index patterns.
3. Prepare backup configuration file referencing OpenSearch connection under `camunda.data.secondary-storage.opensearch`.

(Backup command usage mirrors Elasticsearch steps; adjust endpoints to OpenSearch.)

### High-level flow recap

| Step | Action |
| ---- | ------ |
| 1 | Run privileged schema manager → prepares templates/indices |
| 2 | Start application with restricted user → processes workload |
| 3 | (Upgrade) Run future version schema manager privileged → apply adjustments |
| 4 | Upgrade application with schema creation disabled |
| 5 | (Optional) Run standalone backup application with snapshot privilege |

This staged approach reduces or eliminates downtime for minor upgrades and isolates cluster-level privileges to short-lived administrative tasks rather than long-running services.