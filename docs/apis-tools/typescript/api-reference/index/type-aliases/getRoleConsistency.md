---
title: "Type Alias: getRoleConsistency"
sidebar_label: "getRoleConsistency"
mdx:
  format: md
---

# Type Alias: getRoleConsistency

```ts
type getRoleConsistency = object;
```

Defined in: [gen/CamundaClient.ts:514](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L514)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getRole>>;
```

Defined in: [gen/CamundaClient.ts:516](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L516)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
