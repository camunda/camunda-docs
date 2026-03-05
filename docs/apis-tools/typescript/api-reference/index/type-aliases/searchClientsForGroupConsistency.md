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

Defined in: [gen/CamundaClient.ts:663](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L663)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchClientsForGroup>>;
```

Defined in: [gen/CamundaClient.ts:665](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L665)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
