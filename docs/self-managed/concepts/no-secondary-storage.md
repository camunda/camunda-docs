---
id: no-secondary-storage
title: "No secondary storage"
description: "Run Zeebe clusters with only the engine and primary storage components, without secondary storage dependencies."
---

The `noSecondaryStorage` mode allows you to run Zeebe clusters with only the engine and primary storage components, disabling all components that depend on secondary storage.

## No secondary storage mode

In this mode, only the Zeebe process engine and primary storage components are available. This setup provides core process orchestration functionality, but does **not** include the full feature set of the Camunda platform.

For the complete Camunda 8 experience, including web applications, APIs, and advanced features, we recommend using the standard deployment with secondary storage enabled.

If you believe this mode fits your use case, consult Camunda support or your field team to ensure it aligns with your requirements.

## Understanding primary vs secondary storage

**Primary storage**  
The core storage layer used by the Zeebe engine for process definitions, execution state, and runtime data. It includes everything needed for process execution.

**Secondary storage**  
Additional storage systems, such as Elasticsearch or OpenSearch, that support advanced features like web applications, search APIs, process monitoring, task management, and analytics.

When secondary storage is disabled, you lose access to these advanced features (including all web interfaces and search capabilities) but retain the ability to run and manage processes using the core engine.

## Configuration

Using [Helm charts](../installation-methods/helm/install.md), you can set this flag in your `values.yaml` file:

```yaml
global:
  noSecondaryStorage: true
```

When `global.noSecondaryStorage` is set to true, the Helm charts automatically disable all secondary-storage-dependent components.

### Alternative deployment methods

In addition to using Helm charts, you can enable `noSecondaryStorage` mode through other deployment methods:

- **Docker Compose**: Modify your `docker-compose` file to exclude secondary storage services.
- **Manual deployment**: Start Zeebe without Elasticsearch/OpenSearch or any services that rely on them.

## Components and features disabled in `noSecondaryStorage` mode

The following components and features are unavailable when secondary storage is disabled:

| Category             | Component/Feature                                               | Behavior in `noSecondaryStorage` mode                                               |
| -------------------- | --------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| **Web applications** | Operate                                                         | Disabled                                                                            |
|                      | Tasklist                                                        | Disabled                                                                            |
|                      | Identity UI                                                     | Disabled                                                                            |
|                      | Play (Modeler Play tab)                                         | Disabled                                                                            |
|                      | Optimize                                                        | Disabled                                                                            |
| **APIs & Services**  | Orchestration Cluster REST API (e.g., process/search endpoints) | Search and other ES/OS-backed endpoints return 403 Forbidden with descriptive error |
|                      | Batch Operations API                                            | Returns 403 Forbidden                                                               |
|                      | Usage metrics endpoint (`/usage-metrics`)                       | Returns 403 Forbidden                                                               |
| **Data & Storage**   | Default Camunda exporters (Elasticsearch/OpenSearch)            | Disabled                                                                            |
|                      | Schema Manager                                                  | Disabled                                                                            |
|                      | Secondary storage backups                                       | Disabled                                                                            |

- **Outbound connectors** remain fully supported. However, features that depend on secondary storage, such as process definition lookup for inbound connectors, are unavailable.
- **Custom exporters** to external systems (e.g., MongoDB, Kafka, Prometheus) continue to work, as they rely solely on the engine’s primary storage.

## Usage metrics in engine-only mode

When running without secondary storage:

- **All built-in usage metrics endpoints are disabled.**
- To collect usage metrics, set up a custom exporter or coordinate with Camunda to implement an alternative solution.

See the [custom exporter setup guidance](/self-managed/concepts/exporters.md#custom-exporter-to-filter-specific-records) for details.

## Error handling

- Any attempt to access a disabled feature via REST or API will return a `403 Forbidden` response with a clear and actionable error message.

**Example error response**

```json
{
  "status": 403,
  "detail": "This endpoint requires a secondary storage, but none is set. Secondary storage can be configured using the 'camunda.database.type' property.",
  "instance": "/v2/decision-instances/search"
}
```

- **Startup behavior**: Any affected component or service will log a clear warning at startup and shut down gracefully.
- **SDKs/clients**: When attempting to access unavailable features, SDKs and clients will surface the `403 Forbidden` errors accordingly.

## Limitations and considerations

:::warning
Using `noSecondaryStorage` mode significantly reduces Camunda's capabilities:
:::

- **No visual process management**: Operate and Tasklist are disabled, removing all graphical interfaces for monitoring processes, viewing instances, and managing human tasks.
- **No historical data access**: You cannot query process history, view completed instances, or access audit trails via built-in tools.
- **Limited operational visibility**: Dashboards, analytics, and reporting features in Optimize are unavailable.
- **Reduced developer experience**: Tools for debugging, troubleshooting, and optimization are not accessible.
- **No task management**: Human task functionality is unavailable through Camunda’s task management UI.
- **Limited API functionality**: Many REST endpoints for process management and data retrieval are disabled.

:::note
These limitations mean you are using only a subset of Camunda’s capabilities. Most organizations require the full platform for production workloads.
:::

## When to use this mode

Consider `noSecondaryStorage` mode **only** in specific situations, such as:

- **Local development with C8Run**: For developers who want to run Zeebe locally without the overhead of secondary storage components, C8Run supports this mode by setting the `camunda.database.type=none` environment variable.
- **Specialized technical requirements** that prevent the use of secondary storage.
- **Temporary migration scenarios** where minimal orchestration functionality is needed during a transition period.
- **Resource-constrained environments** where deploying the full platform is not feasible.

In all cases, **contact Camunda before adopting this mode**. Our team can:

- Help evaluate whether this mode fits your use case.
- Suggest alternative approaches that provide more value.
- Recommend migration paths to the full platform in the future.
- Offer guidance on how to work around known limitations.
