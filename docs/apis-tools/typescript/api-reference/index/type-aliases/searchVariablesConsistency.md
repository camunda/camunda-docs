---
title: "Type Alias: searchVariablesConsistency"
sidebar_label: "searchVariablesConsistency"
mdx:
  format: md
---

# Type Alias: searchVariablesConsistency

```ts
type searchVariablesConsistency = object;
```

Defined in: [gen/CamundaClient.ts:977](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L977)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchVariables>>;
```

Defined in: [gen/CamundaClient.ts:979](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L979)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
