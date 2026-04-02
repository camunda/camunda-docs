---
title: "Type Alias: getUserConsistency"
sidebar_label: "getUserConsistency"
mdx:
  format: md
---

# Type Alias: getUserConsistency

```ts
type getUserConsistency = object;
```

Defined in: [gen/CamundaClient.ts:576](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L576)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getUser>>;
```

Defined in: [gen/CamundaClient.ts:578](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L578)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
