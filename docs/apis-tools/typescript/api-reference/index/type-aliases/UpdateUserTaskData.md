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

Defined in: [gen/types.gen.ts:15867](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L15867)

## Properties

### body?

```ts
optional body: UserTaskUpdateRequest;
```

Defined in: [gen/types.gen.ts:15868](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L15868)

***

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:15869](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L15869)

#### userTaskKey

```ts
userTaskKey: UserTaskKey;
```

The key of the user task to update.

***

### query?

```ts
optional query: never;
```

Defined in: [gen/types.gen.ts:15875](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L15875)

***

### url

```ts
url: "/user-tasks/{userTaskKey}";
```

Defined in: [gen/types.gen.ts:15876](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L15876)
