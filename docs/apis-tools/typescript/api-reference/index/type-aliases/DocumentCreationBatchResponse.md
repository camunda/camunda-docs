---
title: "Type Alias: DocumentCreationBatchResponse"
sidebar_label: "DocumentCreationBatchResponse"
mdx:
  format: md
---

# Type Alias: DocumentCreationBatchResponse

```ts
type DocumentCreationBatchResponse = object;
```

Defined in: [gen/types.gen.ts:2411](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2411)

## Properties

### createdDocuments

```ts
createdDocuments: DocumentReference[];
```

Defined in: [gen/types.gen.ts:2419](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2419)

Documents that failed creation.

---

### failedDocuments

```ts
failedDocuments: DocumentCreationFailureDetail[];
```

Defined in: [gen/types.gen.ts:2415](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2415)

Documents that were successfully created.
