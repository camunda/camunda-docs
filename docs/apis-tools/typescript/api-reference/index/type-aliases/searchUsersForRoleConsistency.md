---
title: "Type Alias: searchUsersForRoleConsistency"
sidebar_label: "searchUsersForRoleConsistency"
mdx:
  format: md
---

# Type Alias: searchUsersForRoleConsistency

```ts
type searchUsersForRoleConsistency = object;
```

Defined in: [gen/CamundaClient.ts:941](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L941)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchUsersForRole>>;
```

Defined in: [gen/CamundaClient.ts:943](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L943)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
