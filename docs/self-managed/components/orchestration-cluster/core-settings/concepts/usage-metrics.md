---
id: usage-metrics
title: Orchestration cluster usage metrics
description: "The orchestration cluster exposes usage metrics under the Actuator `usage-metrics` endpoint, accessible on the management port."
---

The orchestration cluster provides usage metrics via the `usage-metrics` Actuator endpoint. This endpoint is available on the management port, configurable with `management.server.port` (default: 8080).

Metrics are generally grouped into three categories:

- **Process instances** – number of process instances created.
- **Decision instances** – number of executed decision instances.
- **Task assignments** – number of active users and assigned tasks.

All endpoints accept the query parameters:

- `startTime`
- `endTime`

The format for both parameters is `yyyy-MM-dd'T'HH:mm:ss.SSSZZ` (e.g., `"1970-11-14T10:50:26.963-0100"`).

## Process instances

Retrieve the total number of process instances created within a given time range:

```
http://<host>:<port>/actuator/usage-metrics/process-instances?startTime={startTime}&endTime={endTime}
```

**Sample response:**

```json
{
  "total": 99
}
```

## Decision instances

Retrieve the total number of decision instances executed within a given time range:

```
http://<host>:<port>/actuator/usage-metrics/decision-instances?startTime={startTime}&endTime={endTime}
```

**Sample response:**

```json
{
  "total": 80
}
```

## Task assignments

Retrieve the number of unique users assigned to tasks within a given time range, including a list of usernames:

```
http://<host>:<port>/actuator/usage-metrics/assignees?startTime={startTime}&endTime={endTime}
```

**Sample response:**

```json
{
  "total": 2,
  "assignees": ["john.lennon", "oprah.winfrey"]
}
```

This endpoint allows reconciliation of users across multiple cluster components and provides insights into active task participants.

## Using usage metrics effectively

- Monitor overall cluster activity by combining process, decision, and task metrics.
- Track trends over time to understand resource usage and user engagement.
- Integrate metrics into dashboards or automation scripts for centralized monitoring.
