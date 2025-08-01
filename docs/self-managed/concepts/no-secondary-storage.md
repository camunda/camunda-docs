---
id: no-secondary-storage
title: "No Secondary Storage (deprecated)"
description: "Run Zeebe clusters with only the engine and primary storage components, without secondary storage dependencies."
---

:::warning Deprecated feature

`noSecondaryStorage` mode is introduced as a **deprecated feature** in Camunda 8.8. This mode is intended only for specific migration scenarios and is not recommended for new deployments. We strongly encourage migrating to the complete Camunda 8 stack for the full feature set and optimal experience.

If you're considering this mode, please consult with Camunda support or your field team to explore alternative solutions.

:::

:::info Self-Managed Only

`noSecondaryStorage` mode is currently only supported for Camunda 8 Self-Managed. This mode is not available or supported on Camunda SaaS.

:::

`noSecondaryStorage` mode allows you to run Zeebe clusters with only the engine and primary storage components, disabling all secondary-storage-dependent components.

## Configuration

Using Helm charts, you can set this flag in your `values.yaml` file:

```yaml
global:
  noSecondaryStorage: true
```

When `global.noSecondaryStorage` is set to true, the Helm charts automatically disable all secondary-storage-dependent components.

## Which components and features are disabled in noSecondaryStorage mode?

| Category             | Component/Feature                                               | Behavior in noSecondaryStorage                                                      |
| -------------------- | --------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| **Web applications** | Operate                                                         | Disabled                                                                            |
|                      | Tasklist                                                        | Disabled                                                                            |
|                      | Identity UI                                                     | Disabled                                                                            |
|                      | Play (Modeler Play tab)                                         | Disabled                                                                            |
|                      | Optimize                                                        | Disabled                                                                            |
| **APIs & Services**  | Orchestration Cluster REST API (e.g., process/search endpoints) | Search and other ES/OS-backed endpoints return 403 Forbidden with descriptive error |
|                      | Batch Operations API                                            | 403 Forbidden error                                                                 |
|                      | Usage Metrics endpoint (`/usage-metrics`)                       | 403 Forbidden error                                                                 |
| **Data & Storage**   | Default Camunda Exporters (Elasticsearch/OpenSearch)            | Disabled                                                                            |
|                      | Schema Manager                                                  | Disabled                                                                            |
|                      | Secondary storage backups                                       | Disabled                                                                            |

- **Outbound connectors** remain fully supported; only features that depend on secondary storage (e.g., process definition lookup for inbound connectors) are unavailable.
- **Custom exporters** to external systems (e.g., MongoDB, Kafka, Prometheus) do work, as they rely solely on the engine's primary storage.

## Usage Metrics in Engine-Only Mode

When running without secondary storage:

- **All built-in usage metrics endpoints are disabled.**
- You must set up a custom exporter to collect relevant usage metrics events from Zeebe. See [custom exporter setup guidance](/self-managed/concepts/exporters.md#custom-exporter-to-filter-specific-records).

## Error handling

- REST/API access to any disabled feature will respond with a clear 403 Forbidden and an actionable error message.

**Example error response**

```json
{
  "status": 403,
  "detail": "This endpoint requires a secondary storage, but none is set. Secondary storage can be configured using the 'camunda.database.type' property.",
  "instance": "/v2/decision-instances/search"
}
```

- **Startup behavior**: Any affected component or service will log a clear startup warning and shut down gracefully.
- **SDKs/clients**: Will surface these 403 errors when API access is attempted for unavailable features.

## Limitations and considerations

- **No in-product historical data access**: Without Operate and Tasklist, you cannot access or query process history except through custom exporters.
- **Reduced tooling**: Some developer, management, and monitoring features (including analytics/Optimize) are unavailable.
- **Future compatibility**: This mode may not be supported for new features or releases and is **not intended** for long-term use.

## Support, Migration, and Further Reading

- **Need help?**
  - Enterprise customers: Contact Camunda Support for configuration or migration assistance.
  - Work with your assigned field team for planning.
  - Refer to [Helm chart documentation](/self-managed/installation-methods/helm/index.md) for current configuration and automation details.
- Remember:
  - `noSecondaryStorage` mode is deprecated and intended only for specific migration scenarios.
  - The full Camunda 8 platform provides the most robust, supported, and feature-complete experience.

_If you're considering noSecondaryStorage mode, review your requirements with Camunda or migrate to a complete Camunda 8 deployment for ongoing support and access to all features._
