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

Defined in: [gen/types.gen.ts:283](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L283)

The type of entity affected by the operation.
