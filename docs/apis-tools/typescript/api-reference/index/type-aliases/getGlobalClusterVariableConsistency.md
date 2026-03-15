---
title: "Type Alias: getGlobalClusterVariableConsistency"
sidebar_label: "getGlobalClusterVariableConsistency"
mdx:
  format: md
---

# Type Alias: getGlobalClusterVariableConsistency

```ts
type getGlobalClusterVariableConsistency = object;
```

Defined in: [gen/CamundaClient.ts:340](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L340)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getGlobalClusterVariable>>;
```

Defined in: [gen/CamundaClient.ts:342](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L342)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
