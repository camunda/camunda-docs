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

Defined in: [gen/CamundaClient.ts:935](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L935)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchUserTaskAuditLogs>>;
```

Defined in: [gen/CamundaClient.ts:937](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L937)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
