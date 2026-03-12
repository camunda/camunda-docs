---
title: "Type Alias: SearchUserTaskAuditLogsData"
sidebar_label: "SearchUserTaskAuditLogsData"
mdx:
  format: md
---

# Type Alias: SearchUserTaskAuditLogsData

```ts
type SearchUserTaskAuditLogsData = object;
```

Defined in: [gen/types.gen.ts:16191](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L16191)

## Properties

### body?

```ts
optional body: UserTaskAuditLogSearchQueryRequest;
```

Defined in: [gen/types.gen.ts:16192](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L16192)

***

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:16193](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L16193)

#### userTaskKey

```ts
userTaskKey: UserTaskKey;
```

The key of the user task.

***

### query?

```ts
optional query: never;
```

Defined in: [gen/types.gen.ts:16199](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L16199)

***

### url

```ts
url: "/user-tasks/{userTaskKey}/audit-logs/search";
```

Defined in: [gen/types.gen.ts:16200](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L16200)
