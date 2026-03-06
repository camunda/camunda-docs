---
title: "Type Alias: getUsageMetricsConsistency"
sidebar_label: "getUsageMetricsConsistency"
mdx:
  format: md
---

# Type Alias: getUsageMetricsConsistency

```ts
type getUsageMetricsConsistency = object;
```

Defined in: [gen/CamundaClient.ts:554](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L554)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getUsageMetrics>>;
```

Defined in: [gen/CamundaClient.ts:556](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L556)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
