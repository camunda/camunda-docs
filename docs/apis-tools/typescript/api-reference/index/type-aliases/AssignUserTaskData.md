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

Defined in: [gen/types.gen.ts:15963](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L15963)

## Properties

### body

```ts
body: UserTaskAssignmentRequest;
```

Defined in: [gen/types.gen.ts:15964](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L15964)

***

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:15965](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L15965)

#### userTaskKey

```ts
userTaskKey: UserTaskKey;
```

The key of the user task to assign.

***

### query?

```ts
optional query: never;
```

Defined in: [gen/types.gen.ts:15971](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L15971)

***

### url

```ts
url: "/user-tasks/{userTaskKey}/assignment";
```

Defined in: [gen/types.gen.ts:15972](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L15972)
