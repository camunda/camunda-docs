---
id: 870-to-880-dual-region
sidebar_label: Dual-region upgrade
title: Upgrade a dual-region deployment from 8.7 to 8.8 using Helm
description: "Additional considerations when upgrading a dual-region Camunda 8 Self-Managed deployment from version 8.7 to 8.8."
toc_max_heading_level: 3
---

Upgrading a Helm-based dual-region Camunda 8 Self-Managed deployment from 8.7 to 8.8 requires additional configuration beyond the standard upgrade.

Use the [Upgrade from 8.7 to 8.8](./870-to-880.md) guide as your baseline.  
If you have custom or non-default component configuration, refer to the [component upgrade guide](../components/870-to-880.md).

:::info
Dual-region deployments, as described in [Dual-region setup](/self-managed/deployment/helm/cloud-providers/amazon/amazon-eks/dual-region.md), require manual exporter configuration. Follow the additional steps below in addition to the standard upgrade process outlined in this guide.
:::

## Required configuration changes

The following changes are specific to dual-region setups and should be reviewed before upgrading.

| Configuration area        | Change required                                       | Description                                                                                                                                                                   |
| ------------------------- | ----------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Exporter keys**         | Replace `global.elasticsearch.disableExporter: false` | Use `orchestration.exporters.camunda.enabled: false` and `orchestration.exporters.zeebe.enabled: false`                                                                       |
| **New Camunda Exporter**  | Define for both regions                               | Configure [Camunda Exporter](/self-managed/components/orchestration-cluster/zeebe/exporters/elasticsearch-exporter.md)                                                        |
| **Legacy Exporter**       | Keep enabled during migration                         | Keep the old [Elasticsearch / OpenSearch Exporter](/self-managed/components/orchestration-cluster/zeebe/exporters/elasticsearch-exporter.md) definitions                      |
| **Environment variables** | Rename gateway prefixes                               | Change `ZEEBE_GATEWAY_*` to `ZEEBE_BROKER_GATEWAY_*` (embedded gateway architecture)                                                                                          |
| **Message compression**   | Add to orchestration configuration                    | Required for migration jobs to communicate with the Zeebe cluster                                                                                                             |
| **Basic auth users**      | Migrate manually                                      | Users defined in `camunda.operate` or `camunda.tasklist` require manual migration to [embedded Identity](/self-managed/components/orchestration-cluster/identity/overview.md) |
| **API security**          | Review defaults                                       | gRPC and REST APIs are secured by default in 8.8                                                                                                                              |

## Configure exporters for both regions

In 8.8, you must define the new Camunda Exporter explicitly for each region while keeping the existing 8.7 exporters enabled during migration.

- Keep all existing `ZEEBE_BROKER_EXPORTERS_ELASTICSEARCH*` definitions
- Add new Camunda Exporter definitions for each region

Refer to [Elasticsearch exporter](/self-managed/components/orchestration-cluster/zeebe/exporters/elasticsearch-exporter.md) for authentication and additional configuration options.

```yaml
orchestration:
  exporters:
    camunda:
      enabled: false
    zeebe:
      enabled: false
  env:
    # Existing 8.7 exporters - retain for migration
    # ...

    # New Region 0 Camunda Exporter
    - name: ZEEBE_BROKER_EXPORTERS_CAMUNDAREGION0_CLASSNAME
      value: io.camunda.exporter.CamundaExporter
    - name: ZEEBE_BROKER_EXPORTERS_CAMUNDAREGION0_ARGS_CONNECT_URL
      value: PLACEHOLDER

    # New Region 1 Camunda Exporter
    - name: ZEEBE_BROKER_EXPORTERS_CAMUNDAREGION1_CLASSNAME
      value: io.camunda.exporter.CamundaExporter
    - name: ZEEBE_BROKER_EXPORTERS_CAMUNDAREGION1_ARGS_CONNECT_URL
      value: PLACEHOLDER
```

> Replace `PLACEHOLDER` with the values currently used for `ZEEBE_BROKER_EXPORTERS_ELASTICSEARCHREGION0_ARGS_CONNECT_URL` and `ELASTICSEARCHREGION1_ARGS_CONNECT_URL`.

## Update gateway environment variables

In 8.8, the Zeebe Gateway is embedded in the Orchestration Cluster. As a result, gateway-related environment variables use a new prefix.

- **Before:** `ZEEBE_GATEWAY_*`
- **After:** `ZEEBE_BROKER_GATEWAY_*`

**Example:**  
`ZEEBE_GATEWAY_CLUSTER_MESSAGECOMPRESSION` → `ZEEBE_BROKER_GATEWAY_CLUSTER_MESSAGECOMPRESSION`

If your dual-region setup uses cluster message compression (which is typical), ensure this variable is also defined under `orchestration.env`. Migration jobs use a standalone gateway and require this setting to communicate with the Zeebe cluster.

## Handle authentication changes

In 8.8, basic authentication applies at the Orchestration Cluster level. If you previously defined users using `camunda.operate.userId` or `camunda.tasklist.userId`, you must migrate them manually.

1. Migrate users to [embedded Identity](/self-managed/components/orchestration-cluster/identity/overview.md).
2. Define initial users to avoid falling back to default `demo:demo` credentials.
3. Review the [Authentication section](./870-to-880.md#authentication) in the main upgrade guide.

### API security defaults

By default, gRPC and REST APIs are secured in 8.8. To restore previous behavior:

```yaml
orchestration:
  security:
    authentication:
      unprotectedApi: false
    authorizations:
      enabled: false
```

## Reference configuration example

For a complete example showing the required 8.7 to 8.8 changes with migration enabled, see [Dual-region `values.yaml` migration example](https://github.com/camunda/c8-multi-region/blob/stable/8.8/aws/dual-region/kubernetes/camunda-values-migration.yml).

## Multi-region specific considerations

Dual-region setups vary. The following scenarios may affect how you run the upgrade.

- **Multiple secondary storages (default)**:  
  If each region uses its own secondary storage:
  - Enable data migration in both regions
  - Each storage is isolated and requires migration independently

- **Single secondary storage (shared cluster):**  
  If both regions share one cluster, for example, a single central Elasticsearch/OpenSearch cluster:
  - Enable data migration in only one region
  - Set `orchestration.migration.data.enabled: true` in the first region
  - Set it to `false` in all others

- **Identity migration:**  
  If Identity is enabled:
  - Enable [Identity migration](./870-to-880.md#identity-migration).
  - Follow the [secret extraction guidance](/self-managed/deployment/helm/configure/secret-management.md#extract-plaintext-values-and-reference-them-as-kubernetes-secrets).

- **Helm-managed single region exporters:**  
  When using one external secondary storage instead of two and using the Helm chart managed exporter:
  - Enable `orchestration.exporters.zeebe.enabled: true` and `orchestration.exporters.camunda.enabled: true`.
  - Keep them disabled if you define exporters manually.

- **Optimize deployment:**  
  If Optimize is used alongside Identity:
  - Keep the legacy Elasticsearch exporter enabled after migration
  - Optimize does not yet support the Camunda Exporter

- **During initial migration execution:**  
  If the importer repeatedly processes the same batch and does not complete:
  - Restart the importer deployment
  - If migration completed successfully in the other region, this often indicates a stuck importer

  ```sh
  kubectl delete pods -l "app.kubernetes.io/component=orchestration-importer"
  ```

- **Upgrade timing and coordination:**  
  Dual-region deployments must be upgraded simultaneously, even though some migration steps run in only one region depending on the setup.

## Post-migration

If Optimize is not in use:

- Disable the legacy Elasticsearch or OpenSearch exporter via the [Zeebe Management API](/self-managed/components/orchestration-cluster/zeebe/operations/management-api.md)
- Remove its configuration from `values.yaml`.

Review the updated [dual-region operational procedure](/self-managed/deployment/helm/operational-tasks/dual-region-ops.md).
