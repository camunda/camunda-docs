---
title: "Type Alias: searchUserTaskVariablesConsistency"
sidebar_label: "searchUserTaskVariablesConsistency"
mdx:
  format: md
---

# Type Alias: searchUserTaskVariablesConsistency

```ts
type searchUserTaskVariablesConsistency = object;
```

Defined in: [gen/CamundaClient.ts:977](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L977)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchUserTaskVariables>>;
```

Defined in: [gen/CamundaClient.ts:979](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L979)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
