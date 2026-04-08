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

Defined in: [gen/types.gen.ts:2253](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2253)

## Properties

### batchOperation

```ts
batchOperation: BatchOperationCreatedResult | null;
```

Defined in: [gen/types.gen.ts:2266](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2266)

The batch operation created for asynchronously deleting the historic data.

This field is only populated when the request `deleteHistory` is set to `true` and the resource
is a process definition. For other resource types (decisions, forms, generic resources),
this field will be `null`.

---

### resourceKey

```ts
resourceKey: ResourceKey;
```

Defined in: [gen/types.gen.ts:2257](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2257)

The system-assigned key for this resource, requested to be deleted.
