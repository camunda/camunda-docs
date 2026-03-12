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

Defined in: [gen/types.gen.ts:2257](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L2257)

## Properties

### batchOperation

```ts
batchOperation: BatchOperationCreatedResult | null;
```

Defined in: [gen/types.gen.ts:2270](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L2270)

The batch operation created for asynchronously deleting the historic data.

This field is only populated when the request `deleteHistory` is set to `true` and the resource
is a process definition. For other resource types (decisions, forms, generic resources),
this field will be `null`.

***

### resourceKey

```ts
resourceKey: ResourceKey;
```

Defined in: [gen/types.gen.ts:2261](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L2261)

The system-assigned key for this resource, requested to be deleted.
