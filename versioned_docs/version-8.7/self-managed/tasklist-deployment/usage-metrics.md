---
id: usage-metrics
title: Usage metrics
description: "Tasklist provides usage metrics under usage-metrics Actuator endpoint. It is exposed on management port."
---

Tasklist provides usage metrics under `usage-metrics` Actuator endpoint. It is exposed on management port, which can be configured via `management.server.port` configuration parameter (default: 8080).

## Number of active users

This endpoint returns the number of unique users assigned to tasks in a given period and each of the unique `usernames`.

This also returns the `usernames` so we can reconcile in the case of multiple instances.

Endpoint:

```
http://<host>:<port>/actuator/usage-metrics/assignees?startTime={startTime}&endTime={endTime}
```

Here, `startTime` and `endTime` are of format `yyyy-MM-dd'T'HH:mm:ss.SSSZZ`, e.g. "1970-11-14T10:50:26.963-0100".

Sample response:

```json
{
  "total": 2,
  "assignees": ["john.lennon", "oprah.winfrey"]
}
```
