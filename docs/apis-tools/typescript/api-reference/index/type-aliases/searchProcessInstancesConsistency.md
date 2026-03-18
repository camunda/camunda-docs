---
title: "Type Alias: searchProcessInstancesConsistency"
sidebar_label: "searchProcessInstancesConsistency"
mdx:
  format: md
---

# Type Alias: searchProcessInstancesConsistency

```ts
type searchProcessInstancesConsistency = object;
```

Defined in: [gen/CamundaClient.ts:881](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L881)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchProcessInstances>>;
```

Defined in: [gen/CamundaClient.ts:883](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L883)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
