---
title: "Type Alias: AssignUserTaskData"
sidebar_label: "AssignUserTaskData"
mdx:
  format: md
---

# Type Alias: AssignUserTaskData

```ts
type AssignUserTaskData = object;
```

Defined in: [gen/types.gen.ts:16209](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L16209)

## Properties

### body

```ts
body: UserTaskAssignmentRequest;
```

Defined in: [gen/types.gen.ts:16210](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L16210)

---

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:16211](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L16211)

#### userTaskKey

```ts
userTaskKey: UserTaskKey;
```

The key of the user task to assign.

---

### query?

```ts
optional query?: never;
```

Defined in: [gen/types.gen.ts:16217](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L16217)

---

### url

```ts
url: "/user-tasks/{userTaskKey}/assignment";
```

Defined in: [gen/types.gen.ts:16218](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L16218)
