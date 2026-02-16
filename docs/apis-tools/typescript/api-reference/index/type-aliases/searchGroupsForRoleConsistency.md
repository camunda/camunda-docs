---
title: "Type Alias: searchGroupsForRoleConsistency"
sidebar_label: "searchGroupsForRoleConsistency"
mdx:
  format: md
---

# Type Alias: searchGroupsForRoleConsistency

```ts
type searchGroupsForRoleConsistency = object;
```

Defined in: [gen/CamundaClient.ts:797](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L797)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchGroupsForRole>>;
```

Defined in: [gen/CamundaClient.ts:799](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L799)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
