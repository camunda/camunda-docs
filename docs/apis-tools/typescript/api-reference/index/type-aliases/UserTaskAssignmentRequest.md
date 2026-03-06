---
title: "Type Alias: UserTaskAssignmentRequest"
sidebar_label: "UserTaskAssignmentRequest"
mdx:
  format: md
---

# Type Alias: UserTaskAssignmentRequest

```ts
type UserTaskAssignmentRequest = object;
```

Defined in: [gen/types.gen.ts:7619](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7619)

## Properties

### action?

```ts
optional action: string | null;
```

Defined in: [gen/types.gen.ts:7633](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7633)

A custom action value that will be accessible from user task events resulting from this endpoint invocation. If not provided, it will default to "assign".

***

### allowOverride?

```ts
optional allowOverride: boolean | null;
```

Defined in: [gen/types.gen.ts:7628](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7628)

By default, the task is reassigned if it was already assigned. Set this to `false` to return an error in such cases. The task must then first be unassigned to be assigned again. Use this when you have users picking from group task queues to prevent race conditions.

***

### assignee?

```ts
optional assignee: string;
```

Defined in: [gen/types.gen.ts:7623](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7623)

The assignee for the user task. The assignee must not be empty or `null`.
