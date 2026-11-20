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

Populated when `deleteHistory` is `true` and either the resource is a decision
requirements definition, or the resource is a process definition that is already fully
deleted from the runtime state (its history is purged directly by a batch operation).

For a process definition that still exists in the runtime state, deletion first drains
the definition and its history is removed asynchronously as part of that lifecycle, so no
batch operation is returned and this field is `null`. It is also `null` for forms and
generic resources.

---

### resourceKey

```ts
resourceKey: ResourceKey;
```

The system-assigned key for this resource, requested to be deleted.
