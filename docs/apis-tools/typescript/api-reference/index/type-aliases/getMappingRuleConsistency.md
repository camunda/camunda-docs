---
title: "Type Alias: getMappingRuleConsistency"
sidebar_label: "getMappingRuleConsistency"
mdx:
  format: md
---

# Type Alias: getMappingRuleConsistency

```ts
type getMappingRuleConsistency = object;
```

Defined in: [gen/CamundaClient.ts:403](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L403)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getMappingRule>>;
```

Defined in: [gen/CamundaClient.ts:405](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L405)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
