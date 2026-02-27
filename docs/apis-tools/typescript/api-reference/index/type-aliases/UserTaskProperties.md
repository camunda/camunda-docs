---
title: "Type Alias: UserTaskProperties"
sidebar_label: "UserTaskProperties"
mdx:
  format: md
---

# Type Alias: UserTaskProperties

```ts
type UserTaskProperties = object;
```

Defined in: [gen/types.gen.ts:3453](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3453)

Contains properties of a user task.

## Properties

### action?

```ts
optional action: string;
```

Defined in: [gen/types.gen.ts:3457](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3457)

The action performed on the user task.

---

### assignee?

```ts
optional assignee: string | null;
```

Defined in: [gen/types.gen.ts:3461](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3461)

The user assigned to the task.

---

### candidateGroups?

```ts
optional candidateGroups: string[];
```

Defined in: [gen/types.gen.ts:3465](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3465)

The groups eligible to claim the task.

---

### candidateUsers?

```ts
optional candidateUsers: string[];
```

Defined in: [gen/types.gen.ts:3469](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3469)

The users eligible to claim the task.

---

### changedAttributes?

```ts
optional changedAttributes: string[];
```

Defined in: [gen/types.gen.ts:3473](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3473)

The attributes that were changed in the task.

---

### dueDate?

```ts
optional dueDate: string | null;
```

Defined in: [gen/types.gen.ts:3477](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3477)

The due date of the user task in ISO 8601 format.

---

### followUpDate?

```ts
optional followUpDate: string | null;
```

Defined in: [gen/types.gen.ts:3481](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3481)

The follow-up date of the user task in ISO 8601 format.

---

### formKey?

```ts
optional formKey: FormKey;
```

Defined in: [gen/types.gen.ts:3485](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3485)

The key of the form associated with the user task.

---

### priority?

```ts
optional priority: number | null;
```

Defined in: [gen/types.gen.ts:3489](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3489)

The priority of the user task.

---

### userTaskKey?

```ts
optional userTaskKey: UserTaskKey | null;
```

Defined in: [gen/types.gen.ts:3493](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3493)

The unique key identifying the user task.
