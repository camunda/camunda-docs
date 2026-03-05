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

Defined in: [gen/CamundaClient.ts:813](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L813)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchJobs>>;
```

Defined in: [gen/CamundaClient.ts:815](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L815)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
