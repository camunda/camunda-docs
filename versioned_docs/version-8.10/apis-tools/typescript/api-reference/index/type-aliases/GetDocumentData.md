---
title: "Type Alias: GetDocumentData"
sidebar_label: "GetDocumentData"
mdx:
  format: md
---

# Type Alias: GetDocumentData

```ts
type GetDocumentData = object;
```

## Properties

### body?

```ts
optional body?: never;
```

---

### path

```ts
path: object;
```

#### documentId

```ts
documentId: DocumentId;
```

The ID of the document to download.

---

### query?

```ts
optional query?: object;
```

#### contentHash?

```ts
optional contentHash?: string;
```

The hash of the document content that was computed by the document store during upload. The hash is part of the document reference that is returned when uploading a document. If the client fails to provide the correct hash, the request will be rejected.

#### storeId?

```ts
optional storeId?: string;
```

The ID of the document store to download the document from.

---

### url

```ts
url: "/documents/{documentId}";
```
