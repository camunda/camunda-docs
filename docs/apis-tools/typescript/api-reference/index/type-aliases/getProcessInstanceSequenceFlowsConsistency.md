---
title: "Type Alias: getProcessInstanceSequenceFlowsConsistency"
sidebar_label: "getProcessInstanceSequenceFlowsConsistency"
mdx:
  format: md
---

# Type Alias: getProcessInstanceSequenceFlowsConsistency

```ts
type getProcessInstanceSequenceFlowsConsistency = object;
```

Defined in: [gen/CamundaClient.ts:476](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L476)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getProcessInstanceSequenceFlows>>;
```

Defined in: [gen/CamundaClient.ts:478](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L478)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
