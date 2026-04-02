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

Defined in: [gen/CamundaClient.ts:949](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L949)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchUserTaskAuditLogs>>;
```

Defined in: [gen/CamundaClient.ts:951](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L951)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
