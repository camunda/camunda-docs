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

Defined in: [gen/types.gen.ts:4019](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4019)

Contains properties of a user task.

## Properties

### action?

```ts
optional action: string;
```

Defined in: [gen/types.gen.ts:4023](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4023)

The action performed on the user task.

***

### assignee?

```ts
optional assignee: string | null;
```

Defined in: [gen/types.gen.ts:4027](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4027)

The user assigned to the task.

***

### candidateGroups

```ts
candidateGroups: string[];
```

Defined in: [gen/types.gen.ts:4031](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4031)

The groups eligible to claim the task.

***

### candidateUsers

```ts
candidateUsers: string[];
```

Defined in: [gen/types.gen.ts:4035](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4035)

The users eligible to claim the task.

***

### changedAttributes

```ts
changedAttributes: string[];
```

Defined in: [gen/types.gen.ts:4039](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4039)

The attributes that were changed in the task.

***

### dueDate?

```ts
optional dueDate: string | null;
```

Defined in: [gen/types.gen.ts:4043](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4043)

The due date of the user task in ISO 8601 format.

***

### followUpDate?

```ts
optional followUpDate: string | null;
```

Defined in: [gen/types.gen.ts:4047](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4047)

The follow-up date of the user task in ISO 8601 format.

***

### formKey?

```ts
optional formKey: FormKey;
```

Defined in: [gen/types.gen.ts:4051](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4051)

The key of the form associated with the user task.

***

### priority?

```ts
optional priority: number | null;
```

Defined in: [gen/types.gen.ts:4055](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4055)

The priority of the user task.

***

### userTaskKey?

```ts
optional userTaskKey: UserTaskKey | null;
```

Defined in: [gen/types.gen.ts:4059](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4059)

The unique key identifying the user task.
