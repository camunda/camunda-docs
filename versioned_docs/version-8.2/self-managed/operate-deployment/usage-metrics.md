---
id: usage-metrics
title: Usage metrics
description: "Operate provides usage metrics under usage-metrics Actuator endpoint. It is exposed on management port."
---

Operate provides usage metrics under `usage-metrics` Actuator endpoint. It is exposed on management port that can be configured via `management.server.port` configuration parameter (default: 8080).

## Amount of created process instances

```
http://<host>:<port>/actuator/usage-metrics/process-instances?startTime={startTime}&endTime={endTime}
```

Here, `startTime` and `endTime` are of format `yyyy-MM-dd'T'HH:mm:ss.SSSZZ`, e.g. "1970-11-14T10:50:26.963-0100".

Sample response:

```json
{
  "total": 99
}
```

## Amount of executed decision instances

```
http://<host>:<port>/actuator/usage-metrics/decision-instances?startTime={startTime}&endTime={endTime}
```

Here, `startTime` and `endTime` are of format `yyyy-MM-dd'T'HH:mm:ss.SSSZZ`, e.g. "1970-11-14T10:50:26.963-0100".

Sample response:

```json
{
  "total": 80
}
```
