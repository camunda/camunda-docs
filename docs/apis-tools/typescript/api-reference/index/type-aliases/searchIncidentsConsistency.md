---
title: "Type Alias: searchIncidentsConsistency"
sidebar_label: "searchIncidentsConsistency"
mdx:
  format: md
---

# Type Alias: searchIncidentsConsistency

```ts
type searchIncidentsConsistency = object;
```

Defined in: [gen/CamundaClient.ts:795](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L795)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchIncidents>>;
```

Defined in: [gen/CamundaClient.ts:797](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L797)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
