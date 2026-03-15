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

Defined in: [gen/types.gen.ts:7750](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L7750)

## Properties

### action?

```ts
optional action: string | null;
```

Defined in: [gen/types.gen.ts:7756](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L7756)

A custom action value that will be accessible from user task events resulting from this endpoint invocation. If not provided, it will default to "update".

***

### changeset?

```ts
optional changeset: Changeset;
```

Defined in: [gen/types.gen.ts:7751](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L7751)
