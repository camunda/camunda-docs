---
title: "Type Alias: getDecisionRequirementsXmlConsistency"
sidebar_label: "getDecisionRequirementsXmlConsistency"
mdx:
  format: md
---

# Type Alias: getDecisionRequirementsXmlConsistency

```ts
type getDecisionRequirementsXmlConsistency = object;
```

Defined in: [gen/CamundaClient.ts:314](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L314)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getDecisionRequirementsXml>>;
```

Defined in: [gen/CamundaClient.ts:316](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L316)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
