---
id: no-secondary-storage
title: "Run without secondary storage"
description: "Run Zeebe clusters using only the engine and primary storage components, disabling all secondary-storage-dependent features."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

Use **no secondary storage** mode to run Zeebe clusters with only the process engine and its primary storage layer.

:::warning
Disabling secondary storage removes key Camunda 8 capabilities, including Operate, Tasklist, and search-based REST endpoints. This mode is suitable only for lightweight development, testing, or specialized technical use cases.
:::

## About this mode

Typically, you should use secondary storage in nearly all production environments to enable monitoring, analytics, querying, and human-task management through Operate, Tasklist, and other applications.

You should **only** disable/run without secondary storage in limited scenarios, such as lightweight development environments, specialized technical use cases, or resource-constrained deployments.

- In this mode, Operate, Tasklist, Identity, and web-based APIs are automatically disabled.
- For Helm deployments, Optimize is also disabled by default when secondary storage is not configured.
- For Docker or manual deployments, you must **explicitly disable Optimize** in your configuration, as it cannot function without secondary storage.

This setup provides core process execution and orchestration capabilities through Zeebe, but excludes the full Camunda platform experience, such as analytics, search, and human-task management.

## Enable **no secondary storage** mode

You can enable this mode in several ways depending on your deployment method.

<Tabs groupId="configuration" defaultValue="helm" queryString values={[
{label: 'Helm', value: 'helm' },
{label: 'Camunda 8 Run or manual', value: 'c8run' },
{label: 'Docker Compose', value: 'docker-compose' },
]}>

<TabItem value="helm">

To disable secondary storage in Helm-based installations, set the following flag in your `values.yaml` file:

```yaml
global:
  noSecondaryStorage: true
```

When this value is set, the Helm charts automatically disable all components that depend on secondary storage.

</TabItem>
<TabItem value="c8run">

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

</TabItem>
<TabItem value="docker-compose">

In a Docker Compose setup, you can disable secondary storage by setting the following environment variable for the relevant service:

```yaml
environment:
  - CAMUNDA_DATA_SECONDARYSTORAGE_TYPE=none
```

</TabItem>
</Tabs>

## Components and features disabled

If secondary storage is disabled, the following components and features are unavailable:

| Category         | Component or feature                                                               | Behavior               |
| :--------------- | :--------------------------------------------------------------------------------- | :--------------------- |
| Web applications | Operate, Tasklist, Identity UI, Optimize, Play (Modeler Play tab)                  | Disabled               |
| APIs & services  | Orchestration Cluster REST API (search endpoints), batch operations, usage metrics | Return `403 Forbidden` |
| Data & storage   | Elasticsearch/OpenSearch exporters, Schema Manager, secondary storage backups      | Disabled               |

:::note

- Outbound connectors remain supported. However, inbound connectors and any features that require process definition lookup are unavailable.
- Custom exporters (for example, Kafka, Prometheus, or MongoDB) continue to work as they interact directly with the engine’s primary storage.

:::

## Error handling and API responses

If you attempt to access a disabled feature, the system returns a descriptive error response.

For example:

```json
{
  "status": 403,
  "detail": "This endpoint requires secondary storage, but none is set. Configure it using the 'camunda.data.secondary-storage.type' property.",
  "instance": "/v2/decision-instances/search"
}
```

- At startup, affected components log a warning and shut down gracefully.
- SDKs and clients will also return a `403 Forbidden` error when interacting with unsupported endpoints.

## Limitations and considerations

Using this mode significantly reduces Camunda’s capabilities:

| Limitation                      | Impact                                                         |
| :------------------------------ | :------------------------------------------------------------- |
| No visual monitoring            | Operate and Tasklist are unavailable.                          |
| No historical data or analytics | Optimize, dashboards, and audit records cannot be accessed.    |
| Limited API access              | Most search and query endpoints return `403 Forbidden`.        |
| Reduced observability           | Built-in metrics and secondary storage exporters are disabled. |
| No human task management        | Tasklist and identity-based task assignment are unavailable.   |

:::note
You can still deploy and execute BPMN and DMN processes using the Zeebe client or REST API endpoints that only rely on the engine.
:::

## When to use this mode

:::caution
Before using this mode in production, consult your Camunda support or field team to ensure it meets your requirements.
:::

Use this mode only in limited, specialized scenarios, such as the following:

| Scenario                                    | Description                                                                                   |
| :------------------------------------------ | :-------------------------------------------------------------------------------------------- |
| Local development with Camunda 8 Run        | Run Zeebe locally without secondary storage components for lightweight testing and iteration. |
| Resource-constrained environments           | Deploy only the Zeebe engine when secondary storage or web applications cannot be supported.  |
| Temporary migration or diagnostic scenarios | Minimal orchestration functionality during transition or troubleshooting.                     |
| Custom monitoring or exporter development   | Use custom exporters or external observability tools instead of secondary storage.            |
