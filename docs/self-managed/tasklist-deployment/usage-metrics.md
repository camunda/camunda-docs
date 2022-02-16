---
id: usage-metrics
title: Usage metrics
---

Tasklist provides usage metrics under `usage-metrics` Actuator endpoint. It is exposed on management port, 
that can be configured via `management.server.port` configuration parameter (default: 8080).

## Number of active users

This endpoints return the number of unique users assigned to tasks in a given period and each of the unique `usernames`.

The reason why it returns also the `usernames` is so that we are able to reconcile in case of multiple instances.

Endpoint:

```
http://<host>:<port>/actuator/usage-metrics/assignees?startTime={startTime}&endTime={endTime}
```

, where `startTime` and `endTime` are of format `yyyy-MM-dd'T'HH:mm:ss.SSSZZ`, e.g. "1970-11-14T10:50:26.963-0100".

Sample response:

```json
{
    "total" : 2,
    "assignees": [
        "john.lennon", 
        "oprah.winfrey"
    ]
}
```