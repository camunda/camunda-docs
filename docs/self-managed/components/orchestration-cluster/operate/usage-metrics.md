---
id: usage-metrics
title: Usage metrics
description: "Operate provides usage metrics under usage-metrics Actuator endpoint. It is exposed on management port."
---

:::warning Deprecated endpoints
With the 8.8 release, Camunda announces the deprecation of the following operate usage metrics endpoints.
Scheduled for removal in the 8.9 release.
Please use the new endpoint instead [/v2/system/usage-metrics](../../../../apis-tools/orchestration-cluster-api-rest/specifications/get-usage-metrics.api.mdx)
:::

Operate provides usage metrics under `usage-metrics` Actuator endpoint. It is exposed on management port that can be configured via `management.server.port` configuration parameter (default: 8080).

## Amount of created process instances

```
http://<host>:<port>/actuator/usage-metrics/process-instances?startTime={startTime}&endTime={endTime}&tenantId={tenantId}
```

Here, `startTime` and `endTime` are of format `yyyy-MM-dd'T'HH:mm:ss.SSSZZ`, e.g. "1970-11-14T10:50:26.963-0100".

`tenantId` is optional and can be used to filter the results for a specific tenant.

Sample response:

```json
{
  "total": 99
}
```

## Amount of executed decision instances

```
http://<host>:<port>/actuator/usage-metrics/decision-instances?startTime={startTime}&endTime={endTime}&tenantId={tenantId}
```

Here, `startTime` and `endTime` are of format `yyyy-MM-dd'T'HH:mm:ss.SSSZZ`, e.g. "1970-11-14T10:50:26.963-0100".

`tenantId` is optional and can be used to filter the results for a specific tenant.

Sample response:

```json
{
  "total": 80
}
```
