---
title: "Type Alias: getProcessInstanceStatisticsByErrorConsistency"
sidebar_label: "getProcessInstanceStatisticsByErrorConsistency"
mdx:
  format: md
---

# Type Alias: getProcessInstanceStatisticsByErrorConsistency

```ts
type getProcessInstanceStatisticsByErrorConsistency = object;
```

Defined in: [gen/CamundaClient.ts:500](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L500)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getProcessInstanceStatisticsByError>>;
```

Defined in: [gen/CamundaClient.ts:502](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L502)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
