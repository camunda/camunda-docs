---
title: "Type Alias: searchMappingRulesForTenantConsistency"
sidebar_label: "searchMappingRulesForTenantConsistency"
mdx:
  format: md
---

# Type Alias: searchMappingRulesForTenantConsistency

```ts
type searchMappingRulesForTenantConsistency = object;
```

Defined in: [gen/CamundaClient.ts:824](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L824)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchMappingRulesForTenant>>;
```

Defined in: [gen/CamundaClient.ts:826](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L826)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
