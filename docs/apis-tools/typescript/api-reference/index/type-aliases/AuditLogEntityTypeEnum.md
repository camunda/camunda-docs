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

Defined in: [gen/types.gen.ts:300](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L300)

The type of entity affected by the operation.
