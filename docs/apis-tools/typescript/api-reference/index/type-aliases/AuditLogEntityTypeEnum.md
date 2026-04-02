---
title: "Type Alias: AuditLogEntityTypeEnum"
sidebar_label: "AuditLogEntityTypeEnum"
mdx:
  format: md
---

# Type Alias: AuditLogEntityTypeEnum

```ts
type AuditLogEntityTypeEnum =
  | "AUTHORIZATION"
  | "BATCH"
  | "DECISION"
  | "GROUP"
  | "INCIDENT"
  | "JOB"
  | "MAPPING_RULE"
  | "PROCESS_INSTANCE"
  | "RESOURCE"
  | "ROLE"
  | "TENANT"
  | "USER"
  | "USER_TASK"
  | "VARIABLE"
  | "CLIENT";
```

Defined in: [gen/types.gen.ts:296](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L296)

The type of entity affected by the operation.
