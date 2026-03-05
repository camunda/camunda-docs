---
title: "Type Alias: getDecisionRequirementsConsistency"
sidebar_label: "getDecisionRequirementsConsistency"
mdx:
  format: md
---

# Type Alias: getDecisionRequirementsConsistency

```ts
type getDecisionRequirementsConsistency = object;
```

Defined in: [gen/CamundaClient.ts:306](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L306)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getDecisionRequirements>>;
```

Defined in: [gen/CamundaClient.ts:308](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L308)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
