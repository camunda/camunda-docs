---
id: no-secondary-storage
title: "Run without secondary storage"
description: "Run Zeebe clusters using only the engine and primary storage components, disabling all secondary-storage-dependent features."
---

Use **no secondary storage mode** to run Zeebe clusters with only the process engine and primary storage components. This mode disables all components that depend on secondary storage, such as Operate, Tasklist, and Optimize.

In this mode, only the Zeebe engine and its primary storage layer are active. This provides core process execution and orchestration capabilities but excludes the full Camunda platform experience, including web applications, APIs, and monitoring tools.

:::note
This mode is primarily intended for **lightweight development or specialized use cases**. Most production environments require secondary storage for analytics, search, and human-task management.
:::

## Configuration

You can enable no-secondary-storage mode in several ways depending on your deployment method.

### Helm

To disable secondary storage in Helm-based installations, set the following flag in your `values.yaml` file:

```yaml
global:
  noSecondaryStorage: true
```

When this value is set, the Helm charts automatically disable all components that depend on secondary storage.

### Camunda 8 Run or manual configuration

To disable secondary storage in Camunda 8 Run or other manual setups, set the following property in your configuration file:

```yaml
spring:
  profiles:
    active: broker,standalone

camunda:
  data:
    secondary-storage:
      type: none
```

Or use environment variables:

```yaml
SPRING_PROFILES_ACTIVE=broker,standalone
CAMUNDA_DATA_SECONDARYSTORAGE_TYPE=none
```

If brokers and gateways run separately, apply the same configuration for gateways:

```yaml
spring:
  profiles:
    active: gateway,standalone

camunda:
  data:
    secondary-storage:
      type: none
```

```bash
SPRING_PROFILES_ACTIVE=gateway,standalone
CAMUNDA_DATA_SECONDARYSTORAGE_TYPE=none
```

### Docker Compose

In a Docker Compose setup, you can disable secondary storage by setting the following environment variable for the relevant service:

```yaml
environment:
  - CAMUNDA_DATA_SECONDARYSTORAGE_TYPE=none
```

## Components and features disabled

When secondary storage is disabled, the following components and features are unavailable:

| Category             | Component or feature                                                               | Behavior               |
| -------------------- | ---------------------------------------------------------------------------------- | ---------------------- |
| **Web applications** | Operate, Tasklist, Identity UI, Optimize, Play (Modeler Play tab)                  | Disabled               |
| **APIs & services**  | Orchestration Cluster REST API (search endpoints), batch operations, usage metrics | Return `403 Forbidden` |
| **Data & storage**   | Elasticsearch/OpenSearch exporters, Schema Manager, secondary storage backups      | Disabled               |

- **Outbound connectors** remain supported.  
  However, inbound connectors and any features that require process definition lookup are unavailable.

- **Custom exporters** (for example, Kafka, Prometheus, or MongoDB) continue to work because they interact directly with the engine’s primary storage.

## Error handling and API responses

When you attempt to access a disabled feature, the system returns a clear and descriptive error response:

```json
{
  "status": 403,
  "detail": "This endpoint requires secondary storage, but none is set. Configure it using the 'camunda.data.secondary-storage.type' property.",
  "instance": "/v2/decision-instances/search"
}
```

At startup, affected components log a warning and shut down gracefully.  
SDKs and clients will also surface `403 Forbidden` errors when interacting with unsupported endpoints.

## Limitations and considerations

:::warning
Using no-secondary-storage mode significantly reduces Camunda’s capabilities.
:::

- **No visual monitoring** – Operate and Tasklist are unavailable.
- **No historical data or analytics** – Optimize, dashboards, and audit records cannot be accessed.
- **Limited API access** – Most search and query endpoints return `403 Forbidden`.
- **Reduced observability** – Built-in metrics and secondary storage exporters are disabled.
- **No human task management** – Tasklist and identity-based task assignment are unavailable.

:::note
You can still deploy and execute BPMN and DMN processes using the Zeebe client or REST API endpoints that rely only on the engine.
:::

## When to use this mode

Use no-secondary-storage mode only in limited, specialized scenarios:

- **Local development with Camunda 8 Run**  
  Run Zeebe locally without secondary storage components for lightweight testing and iteration.

- **Resource-constrained environments**  
  Deploy only the Zeebe engine where secondary storage or web applications cannot be supported.

- **Temporary migration or diagnostic scenarios**  
  Use this configuration when minimal orchestration functionality is needed during transition or troubleshooting.

- **Custom monitoring or exporter development**  
  Suitable for environments where you implement custom exporters or external observability tools that replace secondary storage.

Before using this mode in production, consult your Camunda support or field team to ensure it meets your requirements.

## Next steps

- [Configure secondary storage](./configuring-secondary-storage.md)  
  Learn how to enable and configure secondary storage for Operate, Tasklist, and REST APIs.
- [Manage secondary storage data](./managing-secondary-storage.md)  
  Explore best practices for managing data, backups, and performance monitoring.
