---
title: "Type Alias: getProcessInstanceStatisticsByErrorConsistency"
sidebar_label: "getProcessInstanceStatisticsByErrorConsistency"
mdx:
  format: md
---

# Type Alias: getProcessInstanceStatisticsByErrorConsistency

```ts
type getProcessInstanceStatisticsByErrorConsistency = object;
```

Defined in: [gen/CamundaClient.ts:512](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L512)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<
  _DataOf<typeof Sdk.getProcessInstanceStatisticsByError>
>;
```

Defined in: [gen/CamundaClient.ts:514](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L514)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
