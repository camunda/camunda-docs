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

Defined in: [gen/types.gen.ts:4087](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4087)

Contains properties of a user task.

## Properties

### action

```ts
action: string;
```

Defined in: [gen/types.gen.ts:4091](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4091)

The action performed on the user task.

***

### assignee

```ts
assignee: string | null;
```

Defined in: [gen/types.gen.ts:4095](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4095)

The user assigned to the task.

***

### candidateGroups

```ts
candidateGroups: string[];
```

Defined in: [gen/types.gen.ts:4099](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4099)

The groups eligible to claim the task.

***

### candidateUsers

```ts
candidateUsers: string[];
```

Defined in: [gen/types.gen.ts:4103](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4103)

The users eligible to claim the task.

***

### changedAttributes

```ts
changedAttributes: string[];
```

Defined in: [gen/types.gen.ts:4107](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4107)

The attributes that were changed in the task.

***

### dueDate

```ts
dueDate: string | null;
```

Defined in: [gen/types.gen.ts:4111](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4111)

The due date of the user task in ISO 8601 format.

***

### followUpDate

```ts
followUpDate: string | null;
```

Defined in: [gen/types.gen.ts:4115](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4115)

The follow-up date of the user task in ISO 8601 format.

***

### formKey

```ts
formKey: FormKey | null;
```

Defined in: [gen/types.gen.ts:4119](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4119)

The key of the form associated with the user task.

***

### priority

```ts
priority: number | null;
```

Defined in: [gen/types.gen.ts:4123](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4123)

The priority of the user task.

***

### userTaskKey

```ts
userTaskKey: UserTaskKey | null;
```

Defined in: [gen/types.gen.ts:4127](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4127)

The unique key identifying the user task.
