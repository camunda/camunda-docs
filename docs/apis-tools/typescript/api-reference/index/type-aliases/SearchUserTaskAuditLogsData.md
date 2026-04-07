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

Defined in: [gen/types.gen.ts:16263](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L16263)

## Properties

### body?

```ts
optional body?: UserTaskAuditLogSearchQueryRequest;
```

Defined in: [gen/types.gen.ts:16264](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L16264)

---

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:16265](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L16265)

#### userTaskKey

```ts
userTaskKey: UserTaskKey;
```

The key of the user task.

---

### query?

```ts
optional query?: never;
```

Defined in: [gen/types.gen.ts:16271](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L16271)

---

### url

```ts
url: "/user-tasks/{userTaskKey}/audit-logs/search";
```

Defined in: [gen/types.gen.ts:16272](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L16272)
