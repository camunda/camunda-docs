---
title: "Type Alias: getUserTaskFormConsistency"
sidebar_label: "getUserTaskFormConsistency"
mdx:
  format: md
---

# Type Alias: getUserTaskFormConsistency

```ts
type getUserTaskFormConsistency = object;
```

Defined in: [gen/CamundaClient.ts:592](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L592)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getUserTaskForm>>;
```

Defined in: [gen/CamundaClient.ts:594](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L594)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
