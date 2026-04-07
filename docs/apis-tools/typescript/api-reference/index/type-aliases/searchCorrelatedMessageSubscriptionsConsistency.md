---
title: "Type Alias: searchCorrelatedMessageSubscriptionsConsistency"
sidebar_label: "searchCorrelatedMessageSubscriptionsConsistency"
mdx:
  format: md
---

# Type Alias: searchCorrelatedMessageSubscriptionsConsistency

```ts
type searchCorrelatedMessageSubscriptionsConsistency = object;
```

Defined in: [gen/CamundaClient.ts:712](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L712)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<
  _DataOf<typeof Sdk.searchCorrelatedMessageSubscriptions>
>;
```

Defined in: [gen/CamundaClient.ts:714](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L714)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
