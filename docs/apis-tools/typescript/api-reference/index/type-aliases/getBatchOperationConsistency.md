---
title: "Type Alias: getBatchOperationConsistency"
sidebar_label: "getBatchOperationConsistency"
mdx:
  format: md
---

# Type Alias: getBatchOperationConsistency

```ts
type getBatchOperationConsistency = object;
```

Defined in: [gen/CamundaClient.ts:274](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L274)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getBatchOperation>>;
```

Defined in: [gen/CamundaClient.ts:276](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L276)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
