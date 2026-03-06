---
title: "Type Alias: getDecisionDefinitionXmlConsistency"
sidebar_label: "getDecisionDefinitionXmlConsistency"
mdx:
  format: md
---

# Type Alias: getDecisionDefinitionXmlConsistency

```ts
type getDecisionDefinitionXmlConsistency = object;
```

Defined in: [gen/CamundaClient.ts:290](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L290)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getDecisionDefinitionXml>>;
```

Defined in: [gen/CamundaClient.ts:292](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L292)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
