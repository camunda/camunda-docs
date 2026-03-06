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

Defined in: [gen/CamundaClient.ts:899](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L899)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchUsers>>;
```

Defined in: [gen/CamundaClient.ts:901](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L901)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
