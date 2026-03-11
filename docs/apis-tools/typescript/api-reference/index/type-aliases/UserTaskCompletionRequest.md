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

Defined in: [gen/types.gen.ts:6943](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6943)

## Properties

### action?

```ts
optional action: string | null;
```

Defined in: [gen/types.gen.ts:6954](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6954)

A custom action value that will be accessible from user task events resulting from this endpoint invocation. If not provided, it will default to "complete".

---

### variables?

```ts
optional variables:
  | {
[key: string]: unknown;
}
  | null;
```

Defined in: [gen/types.gen.ts:6947](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6947)

The variables to complete the user task with.
