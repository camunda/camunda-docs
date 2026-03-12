---
title: "Type Alias: getRoleConsistency"
sidebar_label: "getRoleConsistency"
mdx:
  format: md
---

# Type Alias: getRoleConsistency

```ts
type getRoleConsistency = object;
```

Defined in: [gen/CamundaClient.ts:527](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L527)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getRole>>;
```

Defined in: [gen/CamundaClient.ts:529](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L529)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
