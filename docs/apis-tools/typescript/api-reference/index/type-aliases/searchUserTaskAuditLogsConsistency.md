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

Defined in: [gen/CamundaClient.ts:959](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L959)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchUserTaskAuditLogs>>;
```

Defined in: [gen/CamundaClient.ts:961](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L961)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
