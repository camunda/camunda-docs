---
title: "Type Alias: searchUsersForGroupConsistency"
sidebar_label: "searchUsersForGroupConsistency"
mdx:
  format: md
---

# Type Alias: searchUsersForGroupConsistency

```ts
type searchUsersForGroupConsistency = object;
```

Defined in: [gen/CamundaClient.ts:922](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L922)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchUsersForGroup>>;
```

Defined in: [gen/CamundaClient.ts:924](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L924)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
