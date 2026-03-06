---
title: "Type Alias: searchDecisionRequirementsConsistency"
sidebar_label: "searchDecisionRequirementsConsistency"
mdx:
  format: md
---

# Type Alias: searchDecisionRequirementsConsistency

```ts
type searchDecisionRequirementsConsistency = object;
```

Defined in: [gen/CamundaClient.ts:722](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L722)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchDecisionRequirements>>;
```

Defined in: [gen/CamundaClient.ts:724](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L724)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
