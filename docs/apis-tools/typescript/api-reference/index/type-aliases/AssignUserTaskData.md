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

Defined in: [gen/types.gen.ts:16143](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L16143)

## Properties

### body

```ts
body: UserTaskAssignmentRequest;
```

Defined in: [gen/types.gen.ts:16144](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L16144)

***

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:16145](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L16145)

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

Defined in: [gen/types.gen.ts:16151](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L16151)

***

### url

```ts
url: "/user-tasks/{userTaskKey}/assignment";
```

Defined in: [gen/types.gen.ts:16152](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L16152)
