---
title: "Type Alias: getVariableConsistency"
sidebar_label: "getVariableConsistency"
mdx:
  format: md
---

# Type Alias: getVariableConsistency

```ts
type getVariableConsistency = object;
```

Defined in: [gen/CamundaClient.ts:601](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L601)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getVariable>>;
```

Defined in: [gen/CamundaClient.ts:603](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L603)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
