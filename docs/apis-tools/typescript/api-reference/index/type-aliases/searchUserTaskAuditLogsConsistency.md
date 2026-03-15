---
title: "Type Alias: searchUserTaskAuditLogsConsistency"
sidebar_label: "searchUserTaskAuditLogsConsistency"
mdx:
  format: md
---

# Type Alias: searchUserTaskAuditLogsConsistency

```ts
type searchUserTaskAuditLogsConsistency = object;
```

Defined in: [gen/CamundaClient.ts:950](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L950)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchUserTaskAuditLogs>>;
```

Defined in: [gen/CamundaClient.ts:952](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L952)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
