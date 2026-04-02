---
title: "Type Alias: searchJobsConsistency"
sidebar_label: "searchJobsConsistency"
mdx:
  format: md
---

# Type Alias: searchJobsConsistency

```ts
type searchJobsConsistency = object;
```

Defined in: [gen/CamundaClient.ts:803](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L803)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchJobs>>;
```

Defined in: [gen/CamundaClient.ts:805](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L805)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
