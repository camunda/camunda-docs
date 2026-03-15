---
title: "Type Alias: searchUserTaskVariablesConsistency"
sidebar_label: "searchUserTaskVariablesConsistency"
mdx:
  format: md
---

# Type Alias: searchUserTaskVariablesConsistency

```ts
type searchUserTaskVariablesConsistency = object;
```

Defined in: [gen/CamundaClient.ts:968](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L968)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchUserTaskVariables>>;
```

Defined in: [gen/CamundaClient.ts:970](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L970)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
