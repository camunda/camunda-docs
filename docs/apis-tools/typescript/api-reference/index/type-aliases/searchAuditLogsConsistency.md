---
title: "Type Alias: searchAuditLogsConsistency"
sidebar_label: "searchAuditLogsConsistency"
mdx:
  format: md
---

# Type Alias: searchAuditLogsConsistency

```ts
type searchAuditLogsConsistency = object;
```

Defined in: [gen/CamundaClient.ts:630](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L630)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchAuditLogs>>;
```

Defined in: [gen/CamundaClient.ts:632](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L632)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
