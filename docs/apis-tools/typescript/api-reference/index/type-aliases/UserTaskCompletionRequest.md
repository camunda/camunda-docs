---
title: "Type Alias: UserTaskCompletionRequest"
sidebar_label: "UserTaskCompletionRequest"
mdx:
  format: md
---

# Type Alias: UserTaskCompletionRequest

```ts
type UserTaskCompletionRequest = object;
```

Defined in: [gen/types.gen.ts:7719](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L7719)

## Properties

### action?

```ts
optional action: string | null;
```

Defined in: [gen/types.gen.ts:7730](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L7730)

A custom action value that will be accessible from user task events resulting from this endpoint invocation. If not provided, it will default to "complete".

***

### variables?

```ts
optional variables: 
  | {
[key: string]: unknown;
}
  | null;
```

Defined in: [gen/types.gen.ts:7723](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L7723)

The variables to complete the user task with.
