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

## Properties

### createdDocuments

```ts
createdDocuments: DocumentReference[];
```

Documents that failed creation.

---

### failedDocuments

```ts
failedDocuments: DocumentCreationFailureDetail[];
```

Documents that were successfully created.
