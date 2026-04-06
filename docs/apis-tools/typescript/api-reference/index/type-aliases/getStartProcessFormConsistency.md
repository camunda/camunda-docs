---
title: "Type Alias: getStartProcessFormConsistency"
sidebar_label: "getStartProcessFormConsistency"
mdx:
  format: md
---

# Type Alias: getStartProcessFormConsistency

```ts
type getStartProcessFormConsistency = object;
```

Defined in: [gen/CamundaClient.ts:534](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L534)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getStartProcessForm>>;
```

Defined in: [gen/CamundaClient.ts:536](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L536)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
