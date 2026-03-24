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

Defined in: [gen/types.gen.ts:2150](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2150)

## Properties

### batchOperation?

```ts
optional batchOperation: BatchOperationCreatedResult;
```

Defined in: [gen/types.gen.ts:2163](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2163)

The batch operation created for asynchronously deleting the historic data.

This field is only populated when the request `deleteHistory` is set to `true` and the resource
is a process definition. For other resource types (decisions, forms, generic resources),
this field will not be present in the response.

---

### resourceKey

```ts
resourceKey: ResourceKey;
```

Defined in: [gen/types.gen.ts:2154](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2154)

The system-assigned key for this resource, requested to be deleted.
