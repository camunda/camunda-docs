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

Defined in: [gen/types.gen.ts:6974](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6974)

## Properties

### action?

```ts
optional action: string | null;
```

Defined in: [gen/types.gen.ts:6980](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6980)

A custom action value that will be accessible from user task events resulting from this endpoint invocation. If not provided, it will default to "update".

---

### changeset?

```ts
optional changeset: Changeset;
```

Defined in: [gen/types.gen.ts:6975](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6975)
