---
title: "Type Alias: searchElementInstancesConsistency"
sidebar_label: "searchElementInstancesConsistency"
mdx:
  format: md
---

# Type Alias: searchElementInstancesConsistency

```ts
type searchElementInstancesConsistency = object;
```

Defined in: [gen/CamundaClient.ts:771](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L771)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchElementInstances>>;
```

Defined in: [gen/CamundaClient.ts:773](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L773)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
