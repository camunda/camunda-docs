---
title: "Type Alias: searchMappingRulesForRoleConsistency"
sidebar_label: "searchMappingRulesForRoleConsistency"
mdx:
  format: md
---

# Type Alias: searchMappingRulesForRoleConsistency

```ts
type searchMappingRulesForRoleConsistency = object;
```

Defined in: [gen/CamundaClient.ts:815](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L815)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchMappingRulesForRole>>;
```

Defined in: [gen/CamundaClient.ts:817](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L817)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
