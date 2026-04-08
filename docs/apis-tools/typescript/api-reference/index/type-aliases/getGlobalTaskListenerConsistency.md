---
title: "Type Alias: getGlobalTaskListenerConsistency"
sidebar_label: "getGlobalTaskListenerConsistency"
mdx:
  format: md
---

# Type Alias: getGlobalTaskListenerConsistency

```ts
type getGlobalTaskListenerConsistency = object;
```

Defined in: [gen/CamundaClient.ts:357](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L357)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getGlobalTaskListener>>;
```

Defined in: [gen/CamundaClient.ts:359](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L359)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
