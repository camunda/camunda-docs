---
title: "Type Alias: searchMessageSubscriptionsConsistency"
sidebar_label: "searchMessageSubscriptionsConsistency"
mdx:
  format: md
---

# Type Alias: searchMessageSubscriptionsConsistency

```ts
type searchMessageSubscriptionsConsistency = object;
```

Defined in: [gen/CamundaClient.ts:846](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L846)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchMessageSubscriptions>>;
```

Defined in: [gen/CamundaClient.ts:848](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L848)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
