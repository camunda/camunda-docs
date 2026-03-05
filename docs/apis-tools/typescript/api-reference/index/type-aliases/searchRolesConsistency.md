---
title: "Type Alias: searchRolesConsistency"
sidebar_label: "searchRolesConsistency"
mdx:
  format: md
---

# Type Alias: searchRolesConsistency

```ts
type searchRolesConsistency = object;
```

Defined in: [gen/CamundaClient.ts:865](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L865)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchRoles>>;
```

Defined in: [gen/CamundaClient.ts:867](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L867)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
