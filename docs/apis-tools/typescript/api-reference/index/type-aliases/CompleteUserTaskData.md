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

Defined in: [gen/types.gen.ts:16225](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L16225)

## Properties

### body?

```ts
optional body: UserTaskCompletionRequest;
```

Defined in: [gen/types.gen.ts:16226](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L16226)

***

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:16227](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L16227)

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

Defined in: [gen/types.gen.ts:16233](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L16233)

***

### url

```ts
url: "/user-tasks/{userTaskKey}/completion";
```

Defined in: [gen/types.gen.ts:16234](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L16234)
