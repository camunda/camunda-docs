---
title: "Type Alias: searchGroupsForRoleConsistency"
sidebar_label: "searchGroupsForRoleConsistency"
mdx:
  format: md
---

# Type Alias: searchGroupsForRoleConsistency

```ts
type searchGroupsForRoleConsistency = object;
```

Defined in: [gen/CamundaClient.ts:773](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L773)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchGroupsForRole>>;
```

Defined in: [gen/CamundaClient.ts:775](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L775)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
