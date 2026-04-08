---
title: "Type Alias: UpdateUserTaskData"
sidebar_label: "UpdateUserTaskData"
mdx:
  format: md
---

# Type Alias: UpdateUserTaskData

```ts
type UpdateUserTaskData = object;
```

Defined in: [gen/types.gen.ts:16101](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L16101)

## Properties

### body?

```ts
optional body?: UserTaskUpdateRequest;
```

Defined in: [gen/types.gen.ts:16102](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L16102)

---

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:16103](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L16103)

#### userTaskKey

```ts
userTaskKey: UserTaskKey;
```

The key of the user task to update.

---

### query?

```ts
optional query?: never;
```

Defined in: [gen/types.gen.ts:16109](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L16109)

---

### url

```ts
url: "/user-tasks/{userTaskKey}";
```

Defined in: [gen/types.gen.ts:16110](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L16110)
