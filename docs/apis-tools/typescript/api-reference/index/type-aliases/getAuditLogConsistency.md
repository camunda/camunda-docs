---
title: "Type Alias: getAuditLogConsistency"
sidebar_label: "getAuditLogConsistency"
mdx:
  format: md
---

# Type Alias: getAuditLogConsistency

```ts
type getAuditLogConsistency = object;
```

Defined in: [gen/CamundaClient.ts:261](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L261)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getAuditLog>>;
```

Defined in: [gen/CamundaClient.ts:263](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L263)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
