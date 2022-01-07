---
id: usage-metrics
title: Usage metrics
---

Tasklist provides usage metrics under `usage-metrics` Actuator endpoint. It is exposed on management port, 
that can be configured via `management.server.port` configuration parameter (default: 8080).

## Number of active users

Following endpoint returns the number of users that have been assigned to user tasks in given period:

```
http://<host>:<port>/actuator/usage-metrics/assignees?startTime={startTime}&endTime={endTime}
```

, where `startTime` and `endTime` are of format `yyyy-MM-dd'T'HH:mm:ss.SSSZZ`, e.g. "1970-11-14T10:50:26.963-0100".