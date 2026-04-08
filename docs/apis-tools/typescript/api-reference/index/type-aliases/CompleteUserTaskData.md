---
title: "Type Alias: CompleteUserTaskData"
sidebar_label: "CompleteUserTaskData"
mdx:
  format: md
---

# Type Alias: CompleteUserTaskData

```ts
type CompleteUserTaskData = object;
```

Defined in: [gen/types.gen.ts:16297](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L16297)

## Properties

### body?

```ts
optional body?: UserTaskCompletionRequest;
```

Defined in: [gen/types.gen.ts:16298](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L16298)

---

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:16299](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L16299)

#### userTaskKey

```ts
userTaskKey: UserTaskKey;
```

The key of the user task to complete.

---

### query?

```ts
optional query?: never;
```

Defined in: [gen/types.gen.ts:16305](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L16305)

---

### url

```ts
url: "/user-tasks/{userTaskKey}/completion";
```

Defined in: [gen/types.gen.ts:16306](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L16306)
