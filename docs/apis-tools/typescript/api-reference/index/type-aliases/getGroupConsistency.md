---
title: "Type Alias: getGroupConsistency"
sidebar_label: "getGroupConsistency"
mdx:
  format: md
---

# Type Alias: getGroupConsistency

```ts
type getGroupConsistency = object;
```

Defined in: [gen/CamundaClient.ts:366](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L366)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getGroup>>;
```

Defined in: [gen/CamundaClient.ts:368](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L368)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
