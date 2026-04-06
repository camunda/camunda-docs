---
title: "Type Alias: searchClusterVariablesConsistency"
sidebar_label: "searchClusterVariablesConsistency"
mdx:
  format: md
---

# Type Alias: searchClusterVariablesConsistency

```ts
type searchClusterVariablesConsistency = object;
```

Defined in: [gen/CamundaClient.ts:704](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L704)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchClusterVariables>>;
```

Defined in: [gen/CamundaClient.ts:706](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L706)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
