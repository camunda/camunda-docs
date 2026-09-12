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

Contains properties of a user task.

## Properties

### action

```ts
action: string;
```

The action performed on the user task.

---

### assignee

```ts
assignee: string | null;
```

The user assigned to the task.

---

### candidateGroups

```ts
candidateGroups: string[];
```

The groups eligible to claim the task.

---

### candidateUsers

```ts
candidateUsers: string[];
```

The users eligible to claim the task.

---

### changedAttributes

```ts
changedAttributes: string[];
```

The attributes that were changed in the task.

---

### dueDate

```ts
dueDate: string | null;
```

The due date of the user task in ISO 8601 format.

---

### followUpDate

```ts
followUpDate: string | null;
```

The follow-up date of the user task in ISO 8601 format.

---

### formKey

```ts
formKey: FormKey | null;
```

The key of the form associated with the user task.

---

### priority

```ts
priority: number | null;
```

The priority of the user task.

---

### userTaskKey

```ts
userTaskKey: UserTaskKey | null;
```

The unique key identifying the user task.
