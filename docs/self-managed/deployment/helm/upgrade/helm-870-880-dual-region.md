---
id: upgrade-hc-870-880-dual-region
sidebar_label: Dual-Region Upgrade
title: Camunda 8.7 to 8.8 Dual-Region Upgrade
description: "Learn about Dual-Region specifics of the upgrade."
toc_max_heading_level: 3
---

If you are upgrading a dual-region deployment to 8.8, the upgrade steps in the [Upgrade 8.7 to 8.8 as well](./helm-870-880.md) as well as the [components upgrade guide](../../../components/components-upgrade/870-to-880.md) apply. The following are additional configuration considerations for multi-region (dual-region) setups.

:::info
Multi-region deployments, as outlined in our [reference](/self-managed/deployment/helm/cloud-providers/amazon/amazon-eks/dual-region.md), require manual exporter configuration. Follow the additional steps below **in addition to** the standard upgrade process outlined in this guide.
:::

#### Required configuration changes

The following table outlines configuration changes specific to multi-region deployments:

| Configuration area        | Change required                                       | Description                                                                                                                                                                   |
| ------------------------- | ----------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Exporter keys**         | Replace `global.elasticsearch.disableExporter: false` | Use `orchestration.exporters.camunda.enabled: false` and `orchestration.exporters.zeebe.enabled: false` instead                                                               |
| **New Camunda Exporter**  | Define for both regions                               | Configure the new [Camunda Exporter](/self-managed/components/orchestration-cluster/zeebe/exporters/elasticsearch-exporter.md)                                                |
| **Legacy Exporter**       | Retain during migration                               | Keep the old [Elasticsearch / OpenSearch Exporter](/self-managed/components/orchestration-cluster/zeebe/exporters/elasticsearch-exporter.md) definitions                      |
| **Environment variables** | Update gateway prefixes                               | Change `ZEEBE_GATEWAY_*` to `ZEEBE_BROKER_GATEWAY_*` (embedded gateway architecture)                                                                                          |
| **Message compression**   | Add to orchestration config                           | Required for migration jobs to communicate with the Zeebe cluster                                                                                                             |
| **Basic auth users**      | Migrate manually                                      | Users defined in `camunda.operate` or `camunda.tasklist` require manual migration to [embedded Identity](/self-managed/components/orchestration-cluster/identity/overview.md) |
| **API security**          | Review defaults                                       | gRPC and REST APIs are secured by default in 8.8                                                                                                                              |

#### Configure exporters for both regions

Define the new Camunda Exporter for each region while retaining legacy exporters during migration. See the [Camunda Exporter documentation](/self-managed/components/orchestration-cluster/zeebe/exporters/elasticsearch-exporter.md) for authentication and additional configuration options.

**Keep existing 8.7 exporters** (e.g., `ZEEBE_BROKER_EXPORTERS_ELASTICSEARCHREGION0_CLASSNAME`) and **add new Camunda exporters**:

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

#### Update environment variable naming

In 8.8, the Zeebe Gateway is embedded with the Orchestration Cluster. Environment variable prefixes have changed:

- **Old prefix:** `ZEEBE_GATEWAY_*`
- **New prefix:** `ZEEBE_BROKER_GATEWAY_*`

**Example:**  
`ZEEBE_GATEWAY_CLUSTER_MESSAGECOMPRESSION` → `ZEEBE_BROKER_GATEWAY_CLUSTER_MESSAGECOMPRESSION`

:::caution
If your multi-region setup uses cluster message compression (standard practice), additionally configure the former `ZEEBE_GATEWAY_CLUSTER_MESSAGECOMPRESSION` in the `orchestration.env` section. Migration jobs use a standalone gateway and require this variable to communicate with the Zeebe cluster.
:::

#### Handle authentication changes

Basic authentication now applies to the entire Orchestration Cluster. If you previously defined users in `camunda.operate.userId` or `camunda.tasklist.userId`:

1. Manually migrate users to the new [embedded Identity](/self-managed/components/orchestration-cluster/identity/overview.md).
2. Configure initial users to avoid falling back to `demo:demo` credentials.
3. Review the [Authentication](./helm-870-880.md#authentication) section of this guide.

**API security defaults:** gRPC and REST APIs are secured by default in 8.8. To restore previous behavior:

```yaml
orchestration:
  security:
    authentication:
      unprotectedApi: false
    authorizations:
      enabled: false
```

#### Reference configuration example

See the [example `values.yaml`](https://github.com/camunda/c8-multi-region/blob/main/aws/dual-region/kubernetes/camunda-values-migration.yml) showing 8.7 → 8.8 changes with migration enabled.

#### Multi-region specific considerations

Since every setup can differ, here are some edge cases to consider when upgrading multi-region deployments:

- **Multiple secondary storages (default)**:
  When each region has its own secondary storage, enable the migration in both regions, as the storages are isolated and each requires the migration independently.

- **Identity migration (if using Identity):**  
  Enable [Identity migration](./helm-870-880.md#identity-migration). Review the [Extract plaintext values and reference them as kubernetes-secrets](../configure/secret-management.md#extract-plaintext-values-and-reference-them-as-kubernetes-secrets).

- **Helm-managed single region exporters:**  
  When using one external secondary storage instead of two and using the Helm chart managed exporter, consider enabling the following to ensure automatic creation:
  - Set `orchestration.exporters.zeebe.enabled: true` and `orchestration.exporters.camunda.enabled: true`.
  - Keep it disabled in case you're defining the exporter yourself.

- **Single secondary storage (for example, single central Elasticsearch/OpenSearch cluster):**  
  Deploy the data migration in **only one region** - set `orchestration.migration.data.enabled: true` for the first region, and `false` for all others.

- **Optimize deployment (if Optimize is used alongside Identity):**  
  Keep the old Elasticsearch exporter enabled after migration, as Optimize does not yet support the Camunda Exporter.

Regardless, the regions must be upgraded **simultaneously**, though specific caveats may apply as outlined above.

#### Post-migration

If Optimize is not in use, disable the old (legacy Elasticsearch/OpenSearch) exporter via the [Zeebe Management API](/self-managed/components/orchestration-cluster/zeebe/operations/management-api.md) and then remove its configuration from your `values.yaml`.

Review the updated [operational procedure for dual-region](/self-managed/deployment/helm/operational-tasks/dual-region-ops.md).
