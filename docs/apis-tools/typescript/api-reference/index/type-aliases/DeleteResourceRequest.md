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

Defined in: [gen/types.gen.ts:2135](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2135)

## Type Declaration

```ts
{
  deleteHistory?: boolean;
  operationReference?: OperationReference;
}
```

### deleteHistory?

```ts
optional deleteHistory: boolean;
```

Indicates if the historic data of a process resource should be deleted via a
batch operation asynchronously.

This flag is only effective for process resources. For other resource types
(decisions, forms, generic resources), this flag is ignored and no history
will be deleted. In those cases, the `batchOperation` field in the response
will not be populated.

### operationReference?

```ts
optional operationReference: OperationReference;
```

`null`
