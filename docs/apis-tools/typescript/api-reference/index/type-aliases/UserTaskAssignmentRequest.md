---
title: "Type Alias: UserTaskAssignmentRequest"
sidebar_label: "UserTaskAssignmentRequest"
mdx:
  format: md
---

# Type Alias: UserTaskAssignmentRequest

```ts
type UserTaskAssignmentRequest = object;
```

Defined in: [gen/types.gen.ts:6957](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6957)

## Properties

### action?

```ts
optional action: string | null;
```

Defined in: [gen/types.gen.ts:6971](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6971)

A custom action value that will be accessible from user task events resulting from this endpoint invocation. If not provided, it will default to "assign".

---

### allowOverride?

```ts
optional allowOverride: boolean | null;
```

Defined in: [gen/types.gen.ts:6966](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6966)

By default, the task is reassigned if it was already assigned. Set this to `false` to return an error in such cases. The task must then first be unassigned to be assigned again. Use this when you have users picking from group task queues to prevent race conditions.

---

### assignee?

```ts
optional assignee: string;
```

Defined in: [gen/types.gen.ts:6961](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6961)

The assignee for the user task. The assignee must not be empty or `null`.
