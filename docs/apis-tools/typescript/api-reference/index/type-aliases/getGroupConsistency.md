---
title: "Type Alias: getGroupConsistency"
sidebar_label: "getGroupConsistency"
mdx:
  format: md
---

# Type Alias: getGroupConsistency

```ts
type getGroupConsistency = object;
```

Defined in: [gen/CamundaClient.ts:361](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L361)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getGroup>>;
```

Defined in: [gen/CamundaClient.ts:363](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L363)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
