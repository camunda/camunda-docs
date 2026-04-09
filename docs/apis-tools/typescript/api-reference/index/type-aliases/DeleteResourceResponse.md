---
title: "Type Alias: DeleteResourceResponse"
sidebar_label: "DeleteResourceResponse"
mdx:
  format: md
---

# Type Alias: DeleteResourceResponse

```ts
type DeleteResourceResponse = object;
```

## Properties

### batchOperation

```ts
batchOperation: BatchOperationCreatedResult | null;
```

The batch operation created for asynchronously deleting the historic data.

This field is only populated when the request `deleteHistory` is set to `true` and the resource
is a process definition. For other resource types (decisions, forms, generic resources),
this field will be `null`.

---

### resourceKey

```ts
resourceKey: ResourceKey;
```

The system-assigned key for this resource, requested to be deleted.
