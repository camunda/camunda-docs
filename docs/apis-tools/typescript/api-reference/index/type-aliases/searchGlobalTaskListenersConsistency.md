---
title: "Type Alias: searchGlobalTaskListenersConsistency"
sidebar_label: "searchGlobalTaskListenersConsistency"
mdx:
  format: md
---

# Type Alias: searchGlobalTaskListenersConsistency

```ts
type searchGlobalTaskListenersConsistency = object;
```

Defined in: [gen/CamundaClient.ts:761](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L761)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchGlobalTaskListeners>>;
```

Defined in: [gen/CamundaClient.ts:763](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L763)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
