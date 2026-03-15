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

Defined in: [gen/CamundaClient.ts:788](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L788)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchGroupsForRole>>;
```

Defined in: [gen/CamundaClient.ts:790](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L790)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
