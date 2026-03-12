---
title: "Type Alias: searchGlobalTaskListenersConsistency"
sidebar_label: "searchGlobalTaskListenersConsistency"
mdx:
  format: md
---

# Type Alias: searchGlobalTaskListenersConsistency

```ts
type searchGlobalTaskListenersConsistency = object;
```

Defined in: [gen/CamundaClient.ts:762](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L762)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchGlobalTaskListeners>>;
```

Defined in: [gen/CamundaClient.ts:764](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L764)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
