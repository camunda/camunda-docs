---
title: "Type Alias: getGroupConsistency"
sidebar_label: "getGroupConsistency"
mdx:
  format: md
---

# Type Alias: getGroupConsistency

```ts
type getGroupConsistency = object;
```

Defined in: [gen/CamundaClient.ts:365](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L365)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getGroup>>;
```

Defined in: [gen/CamundaClient.ts:367](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L367)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
