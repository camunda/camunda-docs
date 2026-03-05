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

Defined in: [gen/CamundaClient.ts:908](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L908)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchUsersForGroup>>;
```

Defined in: [gen/CamundaClient.ts:910](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L910)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
