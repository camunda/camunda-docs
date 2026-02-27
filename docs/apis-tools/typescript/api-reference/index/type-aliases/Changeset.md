---
title: "Type Alias: Changeset"
sidebar_label: "Changeset"
mdx:
  format: md
---

# Type Alias: Changeset

```ts
type Changeset = {
  [key: string]: unknown;
  candidateGroups?: string[] | null;
  candidateUsers?: string[] | null;
  dueDate?: string | null;
  followUpDate?: string | null;
  priority?: number | null;
} | null;
```

Defined in: [gen/types.gen.ts:7002](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L7002)

JSON object with changed task attribute values.

The following attributes can be adjusted with this endpoint, additional attributes
will be ignored:

- `candidateGroups` - reset by providing an empty list
- `candidateUsers` - reset by providing an empty list
- `dueDate` - reset by providing an empty String
- `followUpDate` - reset by providing an empty String
- `priority` - minimum 0, maximum 100, default 50

Providing any of those attributes with a `null` value or omitting it preserves
the persisted attribute's value.

The assignee cannot be adjusted with this endpoint, use the Assign task endpoint.
This ensures correct event emission for assignee changes.

## Type Declaration

```ts
{
[key: string]: unknown;
  candidateGroups?: string[] | null;
  candidateUsers?: string[] | null;
  dueDate?: string | null;
  followUpDate?: string | null;
  priority?: number | null;
}
```

## Index Signature

```ts
[key: string]: unknown
```

### candidateGroups?

```ts
optional candidateGroups: string[] | null;
```

The list of candidate groups of the task. Reset by providing an empty list.

### candidateUsers?

```ts
optional candidateUsers: string[] | null;
```

The list of candidate users of the task. Reset by providing an empty list.

### dueDate?

```ts
optional dueDate: string | null;
```

The due date of the task. Reset by providing an empty String.

### followUpDate?

```ts
optional followUpDate: string | null;
```

The follow-up date of the task. Reset by providing an empty String.

### priority?

```ts
optional priority: number | null;
```

The priority of the task.

`null`
