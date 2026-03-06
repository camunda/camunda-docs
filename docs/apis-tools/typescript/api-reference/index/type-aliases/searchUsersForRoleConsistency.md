---
title: "Type Alias: searchUsersForRoleConsistency"
sidebar_label: "searchUsersForRoleConsistency"
mdx:
  format: md
---

# Type Alias: searchUsersForRoleConsistency

```ts
type searchUsersForRoleConsistency = object;
```

Defined in: [gen/CamundaClient.ts:917](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L917)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchUsersForRole>>;
```

Defined in: [gen/CamundaClient.ts:919](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L919)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
