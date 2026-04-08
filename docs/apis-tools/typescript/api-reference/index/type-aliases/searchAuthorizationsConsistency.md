---
title: "Type Alias: searchAuthorizationsConsistency"
sidebar_label: "searchAuthorizationsConsistency"
mdx:
  format: md
---

# Type Alias: searchAuthorizationsConsistency

```ts
type searchAuthorizationsConsistency = object;
```

Defined in: [gen/CamundaClient.ts:652](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L652)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchAuthorizations>>;
```

Defined in: [gen/CamundaClient.ts:654](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L654)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
