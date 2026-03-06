---
title: "Type Alias: searchClientsForRoleConsistency"
sidebar_label: "searchClientsForRoleConsistency"
mdx:
  format: md
---

# Type Alias: searchClientsForRoleConsistency

```ts
type searchClientsForRoleConsistency = object;
```

Defined in: [gen/CamundaClient.ts:672](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L672)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchClientsForRole>>;
```

Defined in: [gen/CamundaClient.ts:674](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L674)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
