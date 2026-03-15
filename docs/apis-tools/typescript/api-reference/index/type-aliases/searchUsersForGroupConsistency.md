---
title: "Type Alias: searchUsersForGroupConsistency"
sidebar_label: "searchUsersForGroupConsistency"
mdx:
  format: md
---

# Type Alias: searchUsersForGroupConsistency

```ts
type searchUsersForGroupConsistency = object;
```

Defined in: [gen/CamundaClient.ts:923](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L923)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchUsersForGroup>>;
```

Defined in: [gen/CamundaClient.ts:925](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L925)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
