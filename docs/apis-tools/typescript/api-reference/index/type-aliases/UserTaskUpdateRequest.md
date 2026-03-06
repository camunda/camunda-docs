---
title: "Type Alias: UserTaskUpdateRequest"
sidebar_label: "UserTaskUpdateRequest"
mdx:
  format: md
---

# Type Alias: UserTaskUpdateRequest

```ts
type UserTaskUpdateRequest = object;
```

Defined in: [gen/types.gen.ts:7636](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7636)

## Properties

### action?

```ts
optional action: string | null;
```

Defined in: [gen/types.gen.ts:7642](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7642)

A custom action value that will be accessible from user task events resulting from this endpoint invocation. If not provided, it will default to "update".

***

### changeset?

```ts
optional changeset: Changeset;
```

Defined in: [gen/types.gen.ts:7637](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7637)
