---
id: usage-metrics
title: Usage metrics
description: "The orchestration cluster exposes usage metrics under the Actuator `usage-metrics` endpoint, accessible on the management port."
---

:::warning Deprecated endpoints
With the 8.8 release, Camunda announces [deprecated usage metrics actuator endpoints](#deprecated-usage-metrics-actuator-endpoints). Scheduled for removal in the 8.10 release. Use the [new usage metrics endpoint](#usage-metrics-endpoint-recommended).
:::

## Usage Metrics Endpoint (Recommended)

### What It Does

Fetches usage metrics for a specific date range, including:

- **Process instances:** Total created
- **Decision instances:** Total executed
- **User Tasks assigned:** Total unique assignees
- **Active tenants:** Total active tenants
- **Tenants:** List of active tenants with per-tenant metrics

> **Export Interval:**
> Usage metrics are exported every 5 minutes by default. This may cause a short delay in reported metrics.
>
> ```properties
> zeebe.broker.experimental.engine.usageMetrics.exportInterval=5m
> ```

### API

| Parameter     | Required | Description                  | Format/Default                |
| ------------- | -------- | ---------------------------- | ----------------------------- |
| `startTime`   | Yes      | Start of date range          | `yyyy-MM-dd'T'HH:mm:ss.SSSZZ` |
| `endTime`     | Yes      | End of date range            | `yyyy-MM-dd'T'HH:mm:ss.SSSZZ` |
| `tenantId`    | No       | Filter by tenant             | String                        |
| `withTenants` | No       | Include per-tenant breakdown | `false` (default)             |

**Endpoint:**

```
http://<host>:<port>/v2/system/usage-metrics?startTime={startTime}&endTime={endTime}&tenantId={tenantId}&withTenants={withTenants}
```

More info: [usage metrics API](/apis-tools/orchestration-cluster-api-rest/specifications/get-usage-metrics.api.mdx)

### Examples

**Without tenant breakdown:**

```
http://<host>:<port>/v2/system/usage-metrics?startTime={startTime}&endTime={endTime}&withTenants=false
```

_Response:_

```json
{
  "processInstances": 5,
  "decisionInstances": 23,
  "activeTenants": 2,
  "assignees": 3,
  "tenants": {}
}
```

**With tenant breakdown:**

```
http://<host>:<port>/v2/system/usage-metrics?startTime={startTime}&endTime={endTime}&withTenants=true
```

_Response:_

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

## Using effectively

- Monitor overall cluster activity by combining process, decision, and task metrics.
- Track trends over time to understand resource usage and user engagement.
- Integrate metrics into dashboards or automation scripts for centralized monitoring.

---

## Deprecated Usage Metrics Actuator Endpoints

> **Deprecated:** The following endpoints are deprecated as of 8.8 and will be removed in 8.10. Use the [new usage metrics endpoint](#usage-metrics-endpoint-recommended).

| Endpoint                                     | Description                | Status     |
| -------------------------------------------- | -------------------------- | ---------- |
| `/actuator/usage-metrics/process-instances`  | Total process instances    | Deprecated |
| `/actuator/usage-metrics/decision-instances` | Total decision instances   | Deprecated |
| `/actuator/usage-metrics/assignees`          | Unique user task assignees | Deprecated |

**All endpoints accept:**

- `startTime` (optional)
- `endTime` (optional)
- `tenantId` (optional)

Format: `yyyy-MM-dd'T'HH:mm:ss.SSSZZ` (e.g., `1970-11-14T10:50:26.963-0100`)

### Examples

**Process instances:**

```
http://<host>:<port>/actuator/usage-metrics/process-instances?startTime={startTime}&endTime={endTime}&tenantId={tenantId}
```

_Response:_

```json
{
  "total": 99
}
```

**Decision instances:**

```
http://<host>:<port>/actuator/usage-metrics/decision-instances?startTime={startTime}&endTime={endTime}&tenantId={tenantId}
```

_Response:_

```json
{
  "total": 80
}
```

**Task assignments:**

```
http://<host>:<port>/actuator/usage-metrics/assignees?startTime={startTime}&endTime={endTime}&tenantId={tenantId}
```

_Response:_

```json
{
  "total": 2
}
```

:::warning Breaking change
Assignees list removed from response.
:::

This endpoint allows reconciliation of users across multiple cluster components and provides insights into active task participants.
