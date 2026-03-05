---
title: "Type Alias: getUserTaskFormConsistency"
sidebar_label: "getUserTaskFormConsistency"
mdx:
  format: md
---

# Type Alias: getUserTaskFormConsistency

```ts
type getUserTaskFormConsistency = object;
```

Defined in: [gen/CamundaClient.ts:578](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L578)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getUserTaskForm>>;
```

Defined in: [gen/CamundaClient.ts:580](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L580)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
