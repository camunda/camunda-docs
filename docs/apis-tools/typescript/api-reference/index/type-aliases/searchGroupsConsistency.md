---
title: "Type Alias: searchGroupsConsistency"
sidebar_label: "searchGroupsConsistency"
mdx:
  format: md
---

# Type Alias: searchGroupsConsistency

```ts
type searchGroupsConsistency = object;
```

Defined in: [gen/CamundaClient.ts:788](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L788)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchGroups>>;
```

Defined in: [gen/CamundaClient.ts:790](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L790)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
