---
id: usage-metrics
title: Orchestration cluster usage metrics
description: "The orchestration cluster exposes usage metrics under the Actuator `usage-metrics` endpoint, accessible on the management port."
---

:::warning Deprecated endpoints
With the 8.8 release, Camunda announces [deprecated usage metrics endpoints](#deprecated-usage-metrics-endpoints). Scheduled for removal in the 8.10 release. Use the [new usage metrics endpoint](#usage-metrics-endpoint).
:::

## Usage metrics endpoint

### Overview

Fetches usage metrics for a specific date range:

- **Process instances** – total number of process instances created.
- **Decision instances** – total number of executed decision instances.
- **User Tasks assigned** – total number of **unique** assignees.
- **Active tenants** – total number of active tenants.
- **Tenants** – list of active tenants.
  - **Process instances** – total number of process instances created per tenant.
  - **Decision instances** – total number of executed decision instances per tenant.
  - **User Tasks assigned** – total number of **unique** assignees per tenant.

### Design

Usage metrics have a configurable interval and are collected every 5 minutes. So, it is quite possible that if you create a process instance and immediately query the usage metrics endpoint, the new process instance is not reflected in the response.

### Endpoint

Endpoint accept the following query parameters:

- `startTime`: mandatory
- `endTime`: mandatory
- `tenantId`: optional
- `withTenants`: optional, with default value `false`

The format for `startTime`/`endTime` parameters is `yyyy-MM-dd'T'HH:mm:ss.SSSZZ` (e.g., `"1970-11-14T10:50:26.963-0100"`).

```
http://<host>:<port>/v2/system/usage-metrics?startTime={startTime}&endTime={endTime}&tenantId={tenantId}&withTenants={withTenants}
```

More info can be found in [usage metrics API](/apis-tools/orchestration-cluster-api-rest/specifications/get-usage-metrics.api.mdx).

### Examples

Retrieve usage metrics with tenants false:

```
http://<host>:<port>/v2/system/usage-metrics?startTime={startTime}&endTime={endTime}&tenantId={tenantId}&withTenants=false
```

**Sample response:**

```json
{
  "processInstances": 5,
  "decisionInstances": 23,
  "activeTenants": 2,
  "assignees": 3,
  "tenants": {}
}
```

Retrieve usage metrics with tenants true:

```
http://<host>:<port>/v2/system/usage-metrics?startTime={startTime}&endTime={endTime}&tenantId={tenantId}&withTenants=true
```

**Sample response:**

```json
{
  "processInstances": 5,
  "decisionInstances": 23,
  "activeTenants": 2,
  "assignees": 3,
  "tenants": {
    "tenant1": {
      "processInstances": 1,
      "decisionInstances": 2,
      "assignees": 1
    },
    "tenant2": {
      "processInstances": 4,
      "decisionInstances": 21,
      "assignees": 3
    }
  }
}
```

## Deprecated usage metrics endpoints

Metrics are generally grouped into three categories:

- **Process instances** – number of process instances created.
- **Decision instances** – number of executed decision instances.
- **User Tasks assigned** – number of unique assignees.

All endpoints accept the following optional query parameters:

- `startTime`
- `endTime`
- `tenantId`

The format for `startTime`/`endTime` parameters is `yyyy-MM-dd'T'HH:mm:ss.SSSZZ` (e.g., `"1970-11-14T10:50:26.963-0100"`).

The orchestration cluster provides usage metrics via the `usage-metrics` actuator endpoint. This endpoint is available on the management port, configurable with `management.server.port` (default: 8080).

### Process instances

Retrieve the total number of process instances. Can filter adding a time range and specifying a tenant:

```
http://<host>:<port>/actuator/usage-metrics/process-instances?startTime={startTime}&endTime={endTime}&tenantId={tenantId}
```

**Sample response:**

```json
{
  "total": 99
}
```

### Decision instances

Retrieve the total number of decision instances. Can filter adding a time range and specifying a tenant:

```
http://<host>:<port>/actuator/usage-metrics/decision-instances?startTime={startTime}&endTime={endTime}&tenantId={tenantId}
```

**Sample response:**

```json
{
  "total": 80
}
```

### Task assignments

Retrieve the number of unique users assigned to tasks. Can filter adding a time range and specifying a tenant:

```
http://<host>:<port>/actuator/usage-metrics/assignees?startTime={startTime}&endTime={endTime}&tenantId={tenantId}
```

**Sample response:**

```json
{
  "total": 2
}
```

:::warning Breaking change
Assignees list removed from response.
:::

This endpoint allows reconciliation of users across multiple cluster components and provides insights into active task participants.

## Using usage metrics effectively

- Monitor overall cluster activity by combining process, decision, and task metrics.
- Track trends over time to understand resource usage and user engagement.
- Integrate metrics into dashboards or automation scripts for centralized monitoring.
