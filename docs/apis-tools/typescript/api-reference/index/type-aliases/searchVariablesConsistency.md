---
title: "Type Alias: searchVariablesConsistency"
sidebar_label: "searchVariablesConsistency"
mdx:
  format: md
---

# Type Alias: searchVariablesConsistency

```ts
type searchVariablesConsistency = object;
```

Defined in: [gen/CamundaClient.ts:986](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L986)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchVariables>>;
```

Defined in: [gen/CamundaClient.ts:988](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L988)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
