---
title: "Type Alias: getProcessDefinitionXmlConsistency"
sidebar_label: "getProcessDefinitionXmlConsistency"
mdx:
  format: md
---

# Type Alias: getProcessDefinitionXmlConsistency

```ts
type getProcessDefinitionXmlConsistency = object;
```

Defined in: [gen/CamundaClient.ts:452](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L452)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getProcessDefinitionXml>>;
```

Defined in: [gen/CamundaClient.ts:454](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L454)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
