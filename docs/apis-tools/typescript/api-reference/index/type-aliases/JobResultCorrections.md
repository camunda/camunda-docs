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
  dueDate?: string | null;
  followUpDate?: string | null;
  priority?: number | null;
} | null;
```

Defined in: [gen/types.gen.ts:3807](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3807)

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

## Type Declaration

```ts
{
  assignee?: string | null;
  candidateGroups?: string[] | null;
  candidateUsers?: string[] | null;
  dueDate?: string | null;
  followUpDate?: string | null;
  priority?: number | null;
}
```

### assignee?

```ts
optional assignee: string | null;
```

Assignee of the task.

### candidateGroups?

```ts
optional candidateGroups: string[] | null;
```

The list of candidate groups of the task.

### candidateUsers?

```ts
optional candidateUsers: string[] | null;
```

The list of candidate users of the task.

### dueDate?

```ts
optional dueDate: string | null;
```

The due date of the task.

### followUpDate?

```ts
optional followUpDate: string | null;
```

The follow-up date of the task.

### priority?

```ts
optional priority: number | null;
```

The priority of the task.

`null`
