---
title: "Type Alias: searchJobsConsistency"
sidebar_label: "searchJobsConsistency"
mdx:
  format: md
---

# Type Alias: searchJobsConsistency

```ts
type searchJobsConsistency = object;
```

Defined in: [gen/CamundaClient.ts:789](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L789)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchJobs>>;
```

Defined in: [gen/CamundaClient.ts:791](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/CamundaClient.ts#L791)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
