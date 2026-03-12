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

Defined in: [gen/types.gen.ts:16047](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L16047)

## Properties

### body?

```ts
optional body: UserTaskUpdateRequest;
```

Defined in: [gen/types.gen.ts:16048](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L16048)

***

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:16049](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L16049)

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

Defined in: [gen/types.gen.ts:16055](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L16055)

***

### url

```ts
url: "/user-tasks/{userTaskKey}";
```

Defined in: [gen/types.gen.ts:16056](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L16056)
