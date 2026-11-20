---
title: "Type Alias: JobResultCorrections"
sidebar_label: "JobResultCorrections"
mdx:
  format: md
---

# Type Alias: JobResultCorrections

```ts
type JobResultCorrections = {
  assignee?: string | null;
  candidateGroups?: string[] | null;
  candidateUsers?: string[] | null;
  dueDate?: ClearableDateTime;
  followUpDate?: ClearableDateTime;
  priority?: number | null;
} | null;
```

JSON object with attributes that were corrected by the worker.

The following attributes can be corrected, additional attributes will be ignored:

- `assignee` - clear by providing an empty String
- `dueDate` - clear by providing an empty String
- `followUpDate` - clear by providing an empty String
- `candidateGroups` - clear by providing an empty list
- `candidateUsers` - clear by providing an empty list
- `priority` - minimum 0, maximum 100, default 50

Providing any of those attributes with a `null` value or omitting it preserves
the persisted attribute's value.

## Union Members

### Type Literal

```ts
{
  assignee?: string | null;
  candidateGroups?: string[] | null;
  candidateUsers?: string[] | null;
  dueDate?: ClearableDateTime;
  followUpDate?: ClearableDateTime;
  priority?: number | null;
}
```

#### assignee?

```ts
assignee?: string | null;
```

Assignee of the task.

#### candidateGroups?

```ts
candidateGroups?: string[] | null;
```

The list of candidate groups of the task.

#### candidateUsers?

```ts
candidateUsers?: string[] | null;
```

The list of candidate users of the task.

#### dueDate?

```ts
dueDate?: ClearableDateTime;
```

The due date of the task. Clear by providing an empty String.

#### followUpDate?

```ts
followUpDate?: ClearableDateTime;
```

The follow-up date of the task. Clear by providing an empty String.

#### priority?

```ts
priority?: number | null;
```

The priority of the task.

---

`null`
