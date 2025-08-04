---
id: no-secondary-storage
title: "No Secondary Storage"
description: "Run Zeebe clusters with only the engine and primary storage components, without secondary storage dependencies."
---

`noSecondaryStorage` mode allows you to run Zeebe clusters with only the engine and primary storage components, disabling all secondary-storage-dependent components.

## No Secondary Storage Mode

`noSecondaryStorage` mode provides access only to the Zeebe process engine and primary storage components. With this configuration, only the core process orchestration capabilities are available, and the full feature set of the Camunda platform is not accessible.

For the complete Camunda 8 experience with all web applications, APIs, and advanced features, we recommend using the standard deployment with secondary storage enabled.

If you believe this mode fits your specific use case, please consult with Camunda support or your field team to ensure it meets your requirements.

## Understanding Primary vs Secondary Storage

**Primary Storage**: The core storage layer used by the Zeebe engine for process definitions, process state, and execution data. This includes all the data required for process execution.

**Secondary Storage**: Additional storage systems (such as Elasticsearch or OpenSearch) that power the web applications, search APIs, and advanced features like process monitoring, task management, and analytics.

When secondary storage is disabled, you lose access to web interfaces and search capabilities but retain the core process orchestration functionality.

## Configuration

Using [Helm charts](../installation-methods/helm/install.md), you can set this flag in your `values.yaml` file:

```yaml
global:
  noSecondaryStorage: true
```

When `global.noSecondaryStorage` is set to true, the Helm charts automatically disable all secondary-storage-dependent components.

Alternative deployment methods:
- **Docker Compose**: Modify your compose file to exclude secondary storage services
- **Manual deployment**: Configure Zeebe without starting Elasticsearch/OpenSearch and dependent services

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
- You must set up a custom exporter to collect relevant usage metrics events from Zeebe, or work with Camunda to agree on an alternative solution for usage metrics collection. See [custom exporter setup guidance](/self-managed/concepts/exporters.md#custom-exporter-to-filter-specific-records).

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

**This mode significantly reduces Camunda's capabilities:**

- **No visual process management**: Without Operate and Tasklist, you lose all graphical interfaces for monitoring processes, viewing process instances, and managing user tasks
- **No historical data access**: You cannot query process history, view completed instances, or access audit trails through Camunda's built-in tools
- **Limited operational visibility**: No dashboards, analytics, or reporting capabilities through Optimize
- **Reduced developer experience**: Missing tools for debugging, troubleshooting, and process optimization
- **No task management**: Human tasks cannot be managed through Camunda's task management interface
- **Limited API functionality**: Many REST endpoints for process management and data retrieval are unavailable

**Important:** These limitations mean you're essentially using only a fraction of Camunda's value proposition. Most organizations require the full platform capabilities for production use.

## When to use this mode

This mode should **only** be considered in specific scenarios such as:

- **Specialized technical requirements** that make it difficult to deploy secondary storage
- **Temporary migration scenarios** where you need minimal functionality during transition
- **Resource-constrained environments** where deploying the full platform isn't feasible

In all cases, **contact Camunda before implementing this mode**. Our team can:
- Help evaluate if this mode truly fits your requirements
- Suggest alternative approaches that might provide better value
- Outline potential migration paths to the full platform in the future
- Provide guidance on working around the limitations