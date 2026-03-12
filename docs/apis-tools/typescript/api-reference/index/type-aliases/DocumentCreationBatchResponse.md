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

Defined in: [gen/types.gen.ts:2415](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L2415)

## Properties

### createdDocuments

```ts
createdDocuments: DocumentReference[];
```

Defined in: [gen/types.gen.ts:2423](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L2423)

Documents that failed creation.

***

### failedDocuments

```ts
failedDocuments: DocumentCreationFailureDetail[];
```

Defined in: [gen/types.gen.ts:2419](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L2419)

Documents that were successfully created.
