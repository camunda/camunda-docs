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

Defined in: [gen/CamundaClient.ts:932](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L932)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchUsersForRole>>;
```

Defined in: [gen/CamundaClient.ts:934](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L934)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
