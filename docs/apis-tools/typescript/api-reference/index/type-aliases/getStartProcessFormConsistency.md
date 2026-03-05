---
title: "Type Alias: getStartProcessFormConsistency"
sidebar_label: "getStartProcessFormConsistency"
mdx:
  format: md
---

# Type Alias: getStartProcessFormConsistency

```ts
type getStartProcessFormConsistency = object;
```

Defined in: [gen/CamundaClient.ts:522](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L522)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getStartProcessForm>>;
```

Defined in: [gen/CamundaClient.ts:524](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L524)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
