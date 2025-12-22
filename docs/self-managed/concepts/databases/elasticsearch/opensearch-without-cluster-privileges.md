---
id: opensearch-without-cluster-privileges
title: "OpenSearch without cluster privileges"
keywords: ["opensearch", "schema", "backup", "standalone"]
---

If the Camunda single application cannot access OpenSearch with cluster-level privileges (for example, due to restrictive IAM or fine‑grained access control policies), you can run the schema manager as a standalone application, separate from the main application.

This approach mirrors the Elasticsearch procedure, but uses OpenSearch-specific configuration and privileges. For Elasticsearch, see [Elasticsearch without cluster privileges](./elasticsearch-without-cluster-privileges.md).

## Standalone schema manager

When you run the schema manager as a standalone application, it requires
cluster-level privileges only during schema creation and settings updates.
The Camunda application then runs with index-level privileges only.

- Database support: This setup is supported only for OpenSearch installations (Elasticsearch procedure uses a different configuration).
- Required privileges: The Camunda application requires the `manage` index-level privilege to operate (see [OpenSearch privileges](./opensearch-privileges.md)).

To run the schema manager as a standalone application:

1. [Initialize the schema manager](#initialize): Create templates, indices (as required), and apply retention ISM policies.

2. [Start the Camunda single application](#start): Run without cluster-level privileges using a restricted user.

### Initialize the schema manager {#initialize}

The schema manager is a separate Java application responsible for creating and managing the database schema and applying index template settings (for example, shard/replica counts and retention policies).

:::note

- Initialization requires a user with cluster-level privileges. For example, use an OpenSearch administrative role with access to action groups such as `cluster_manage_index_templates`, `cluster_monitor`, and the index template CRUD permissions listed in [OpenSearch privileges](./opensearch-privileges.md).
- Initialization needs to be executed only once per installation (and again for minor upgrades requiring schema adjustments).
  :::

#### Configure the schema manager settings

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

Start the `schema` Java application (or `schema.bat` on Windows) from the `bin` directory by using your custom configuration file.

Assuming your configuration is saved as `schema-manager-opensearch.yaml`:

```bash
SPRING_CONFIG_ADDITIONALLOCATION=/path/to/schema-manager-opensearch.yaml ./bin/schema
```

Wait for successful completion (application exits cleanly) before moving to step 2.

### Start the Camunda single application {#start}

Start the application with a less privileged OpenSearch user—only index‑level privileges (`manage` for required indices) are needed.

#### OpenSearch user with required privileges

Create or reuse a user with at least the following index privileges on all Camunda indices:

- `manage` (covers create index, mappings updates, search, read, write)

You can create a role using OpenSearch Security plugin APIs (for IAM roles on AWS OpenSearch Service, please refer to [Identity and Access Management in Amazon OpenSearch Service](https://docs.aws.amazon.com/opensearch-service/latest/developerguide/ac.html)). Example role definition:

```bash
curl -XPUT https://localhost:9200/_plugins/_security/api/roles/camunda_app_role \
  -H 'Content-Type: application/json' \
  -u admin:admin \
  -d '{
    "cluster_permissions": [
      "indices:data/read/scroll/clear"
    ],
    "index_permissions": [
      {
        "index_patterns": [
          "zeebe-*",
          "operate-*",
          "tasklist-*",
          "camunda-*"
        ],
        "allowed_actions": [
          "indices:data/write/*",
          "indices:data/read/*",
          "indices:admin/create",
          "indices:admin/shards/search_shards"
        ]
      }
    ]
  }'
```

Then assign the role to the user (example using Security plugin user API):

```bash
curl -XPUT https://localhost:9200/_plugins/_security/api/internalusers/camunda-app \
  -H 'Content-Type: application/json' \
  -u admin:admin \
  -d '{"password": "camunda123", "opendistro_security_roles": ["camunda_app_role"]}'
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
  tasklist:
    opensearch:
      health-check-enabled: false
    # Only required for upgrades from 8.7 (legacy component configs)
    zeebe-elasticsearch: # legacy key retained for backward compatibility
      username: camunda-app
      password: camunda123
      url: https://localhost:9200
      ssl:
        self-signed: true
        verify-hostname: false
        certificate-path: PATH_TO_CA_CERT
  operate:
    opensearch:
      health-check-enabled: false
    # Only required for upgrades from 8.7 (legacy component configs)
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
    camunda.tasklist.opensearch:
      health-check-enabled: false
    camunda.operate.opensearch:
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

### Minor version upgrades with the standalone schema manager {#minor-upgrades}

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

1. For Operate and Tasklist 8.7.11+, set `updateSchemaSettings: true` if applicable.
2. Run schema manager with privileged user while application remains online.
3. Verify successful completion.

### Limitations

- This procedure applies to OpenSearch installations only.
- Optimize supports OpenSearch (see release notes). However, you cannot include Optimize in this reduced-privilege model if it requires additional cluster features, such as advanced aggregations. Evaluate required privileges before including Optimize.
- Does not remove the need for appropriate ISM permissions if retention is enabled.

## Standalone backup application

Snapshot backups require the `manage_snapshots` cluster-level privilege. If the main application cannot hold this privilege, run a separate backup application with an elevated user.

- Database support: Supported only for OpenSearch installations in this procedure.
- Indices covered: Operate and Tasklist indices (Optimize indices excluded from this simplified procedure; handle separately if used).

Before running the standalone backup manager:

1. Ensure snapshot repository is configured (for example, S3, filesystem) with appropriate permissions.
2. Ensure elevated user has `manage_snapshots` and access to index patterns.
3. Prepare backup configuration file referencing OpenSearch connection under `camunda.data.secondary-storage.opensearch`.

(Backup command usage mirrors Elasticsearch steps; adjust endpoints to OpenSearch.)

### High-level flow recap

| Step | Action                                                               |
| ---- | -------------------------------------------------------------------- |
| 1    | Run the privileged schema manager to prepare templates and indices   |
| 2    | Start the application with a restricted user                         |
| 3    | (Upgrade) Run the next version of the schema manager with privileges |
| 4    | Upgrade the application with schema creation disabled                |
| 5    | (Optional) Run the standalone backup application                     |

This staged approach reduces or eliminates downtime for minor upgrades and isolates cluster-level privileges to short-lived administrative tasks rather than long-running services.
