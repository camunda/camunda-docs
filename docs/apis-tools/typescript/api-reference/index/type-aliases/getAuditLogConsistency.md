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

Defined in: [gen/CamundaClient.ts:260](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L260)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getAuditLog>>;
```

Defined in: [gen/CamundaClient.ts:262](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L262)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
