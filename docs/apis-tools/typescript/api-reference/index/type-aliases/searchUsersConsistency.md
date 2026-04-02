---
title: "Type Alias: searchUsersConsistency"
sidebar_label: "searchUsersConsistency"
mdx:
  format: md
---

# Type Alias: searchUsersConsistency

```ts
type searchUsersConsistency = object;
```

Defined in: [gen/CamundaClient.ts:913](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L913)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchUsers>>;
```

Defined in: [gen/CamundaClient.ts:915](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L915)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
