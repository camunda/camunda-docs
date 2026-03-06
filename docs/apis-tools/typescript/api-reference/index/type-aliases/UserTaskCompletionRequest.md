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

Defined in: [gen/types.gen.ts:7605](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7605)

## Properties

### action?

```ts
optional action: string | null;
```

Defined in: [gen/types.gen.ts:7616](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7616)

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

Defined in: [gen/types.gen.ts:7609](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7609)

The variables to complete the user task with.
