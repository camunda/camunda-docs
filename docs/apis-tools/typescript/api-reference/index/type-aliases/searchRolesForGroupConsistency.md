---
title: "Type Alias: searchRolesForGroupConsistency"
sidebar_label: "searchRolesForGroupConsistency"
mdx:
  format: md
---

# Type Alias: searchRolesForGroupConsistency

```ts
type searchRolesForGroupConsistency = object;
```

Defined in: [gen/CamundaClient.ts:874](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L874)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchRolesForGroup>>;
```

Defined in: [gen/CamundaClient.ts:876](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L876)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
