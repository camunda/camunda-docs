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

Defined in: [gen/types.gen.ts:16045](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L16045)

## Properties

### body?

```ts
optional body: UserTaskCompletionRequest;
```

Defined in: [gen/types.gen.ts:16046](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L16046)

***

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:16047](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L16047)

#### userTaskKey

```ts
userTaskKey: UserTaskKey;
```

The key of the user task to complete.

***

### query?

```ts
optional query: never;
```

Defined in: [gen/types.gen.ts:16053](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L16053)

***

### url

```ts
url: "/user-tasks/{userTaskKey}/completion";
```

Defined in: [gen/types.gen.ts:16054](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L16054)
