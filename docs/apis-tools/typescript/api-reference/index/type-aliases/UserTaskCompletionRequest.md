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

Defined in: [gen/types.gen.ts:7729](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L7729)

## Properties

### action?

```ts
optional action?: string | null;
```

Defined in: [gen/types.gen.ts:7740](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L7740)

A custom action value that will be accessible from user task events resulting from this endpoint invocation. If not provided, it will default to "complete".

---

### variables?

```ts
optional variables?:
  | {
[key: string]: unknown;
}
  | null;
```

Defined in: [gen/types.gen.ts:7733](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L7733)

The variables to complete the user task with.
