---
title: "Type Alias: DeleteResourceRequest"
sidebar_label: "DeleteResourceRequest"
mdx:
  format: md
---

# Type Alias: DeleteResourceRequest

```ts
type DeleteResourceRequest = {
  deleteHistory?: boolean;
  operationReference?: OperationReference;
} | null;
```

## Union Members

### Type Literal

```ts
{
  deleteHistory?: boolean;
  operationReference?: OperationReference;
}
```

#### deleteHistory?

```ts
optional deleteHistory?: boolean;
```

Indicates if the historic data associated with the resource should also be deleted
asynchronously.

This flag is effective for process definitions and decision requirements definitions.
For other resource types (forms, generic resources) it is ignored and no history is
deleted. For a decision requirements definition the `batchOperation` field in the
response carries the created batch operation. For a process definition the history is
deleted as part of the definition's draining/deletion lifecycle and no batch operation is
returned.

#### operationReference?

```ts
optional operationReference?: OperationReference;
```

---

`null`
