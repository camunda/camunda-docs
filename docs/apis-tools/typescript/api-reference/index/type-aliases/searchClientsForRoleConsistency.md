---
title: "Type Alias: searchClientsForRoleConsistency"
sidebar_label: "searchClientsForRoleConsistency"
mdx:
  format: md
---

# Type Alias: searchClientsForRoleConsistency

```ts
type searchClientsForRoleConsistency = object;
```

Defined in: [gen/CamundaClient.ts:687](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L687)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchClientsForRole>>;
```

Defined in: [gen/CamundaClient.ts:689](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L689)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
