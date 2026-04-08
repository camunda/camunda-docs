---
title: "Type Alias: searchClientsForGroupConsistency"
sidebar_label: "searchClientsForGroupConsistency"
mdx:
  format: md
---

# Type Alias: searchClientsForGroupConsistency

```ts
type searchClientsForGroupConsistency = object;
```

Defined in: [gen/CamundaClient.ts:677](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L677)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchClientsForGroup>>;
```

Defined in: [gen/CamundaClient.ts:679](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L679)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
