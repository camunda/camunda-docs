---
title: "Type Alias: getGlobalTaskListenerConsistency"
sidebar_label: "getGlobalTaskListenerConsistency"
mdx:
  format: md
---

# Type Alias: getGlobalTaskListenerConsistency

```ts
type getGlobalTaskListenerConsistency = object;
```

Defined in: [gen/CamundaClient.ts:358](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L358)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getGlobalTaskListener>>;
```

Defined in: [gen/CamundaClient.ts:360](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L360)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
