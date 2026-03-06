---
title: "Type Alias: searchMappingRulesForGroupConsistency"
sidebar_label: "searchMappingRulesForGroupConsistency"
mdx:
  format: md
---

# Type Alias: searchMappingRulesForGroupConsistency

```ts
type searchMappingRulesForGroupConsistency = object;
```

Defined in: [gen/CamundaClient.ts:806](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L806)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchMappingRulesForGroup>>;
```

Defined in: [gen/CamundaClient.ts:808](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L808)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
