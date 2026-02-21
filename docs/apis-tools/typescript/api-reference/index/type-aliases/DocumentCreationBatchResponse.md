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

Defined in: [gen/types.gen.ts:2308](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2308)

## Properties

### createdDocuments?

```ts
optional createdDocuments: DocumentReference[];
```

Defined in: [gen/types.gen.ts:2316](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2316)

Documents that failed creation.

---

### failedDocuments?

```ts
optional failedDocuments: DocumentCreationFailureDetail[];
```

Defined in: [gen/types.gen.ts:2312](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2312)

Documents that were successfully created.
