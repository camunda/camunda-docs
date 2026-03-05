---
title: "Type Alias: getUserConsistency"
sidebar_label: "getUserConsistency"
mdx:
  format: md
---

# Type Alias: getUserConsistency

```ts
type getUserConsistency = object;
```

Defined in: [gen/CamundaClient.ts:562](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L562)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getUser>>;
```

Defined in: [gen/CamundaClient.ts:564](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L564)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
