---
title: "Type Alias: getUserTaskConsistency"
sidebar_label: "getUserTaskConsistency"
mdx:
  format: md
---

# Type Alias: getUserTaskConsistency

```ts
type getUserTaskConsistency = object;
```

Defined in: [gen/CamundaClient.ts:570](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L570)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getUserTask>>;
```

Defined in: [gen/CamundaClient.ts:572](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L572)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
