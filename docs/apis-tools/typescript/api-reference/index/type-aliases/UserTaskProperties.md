---
title: "Type Alias: UserTaskProperties"
sidebar_label: "UserTaskProperties"
mdx:
  format: md
---

# Type Alias: UserTaskProperties

```ts
type UserTaskProperties = object;
```

Defined in: [gen/types.gen.ts:4090](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4090)

Contains properties of a user task.

## Properties

### action

```ts
action: string;
```

Defined in: [gen/types.gen.ts:4094](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4094)

The action performed on the user task.

---

### assignee

```ts
assignee: string | null;
```

Defined in: [gen/types.gen.ts:4098](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4098)

The user assigned to the task.

---

### candidateGroups

```ts
candidateGroups: string[];
```

Defined in: [gen/types.gen.ts:4102](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4102)

The groups eligible to claim the task.

---

### candidateUsers

```ts
candidateUsers: string[];
```

Defined in: [gen/types.gen.ts:4106](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4106)

The users eligible to claim the task.

---

### changedAttributes

```ts
changedAttributes: string[];
```

Defined in: [gen/types.gen.ts:4110](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4110)

The attributes that were changed in the task.

---

### dueDate

```ts
dueDate: string | null;
```

Defined in: [gen/types.gen.ts:4114](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4114)

The due date of the user task in ISO 8601 format.

---

### followUpDate

```ts
followUpDate: string | null;
```

Defined in: [gen/types.gen.ts:4118](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4118)

The follow-up date of the user task in ISO 8601 format.

---

### formKey

```ts
formKey: FormKey | null;
```

Defined in: [gen/types.gen.ts:4122](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4122)

The key of the form associated with the user task.

---

### priority

```ts
priority: number | null;
```

Defined in: [gen/types.gen.ts:4126](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4126)

The priority of the user task.

---

### userTaskKey

```ts
userTaskKey: UserTaskKey | null;
```

Defined in: [gen/types.gen.ts:4130](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4130)

The unique key identifying the user task.
