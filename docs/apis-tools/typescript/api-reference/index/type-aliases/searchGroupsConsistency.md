---
title: "Type Alias: searchGroupsConsistency"
sidebar_label: "searchGroupsConsistency"
mdx:
  format: md
---

# Type Alias: searchGroupsConsistency

```ts
type searchGroupsConsistency = object;
```

Defined in: [gen/CamundaClient.ts:764](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L764)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchGroups>>;
```

Defined in: [gen/CamundaClient.ts:766](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L766)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
