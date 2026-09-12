---
title: "Type Alias: CreateDocumentLinkData"
sidebar_label: "CreateDocumentLinkData"
mdx:
  format: md
---

# Type Alias: CreateDocumentLinkData

```ts
type CreateDocumentLinkData = object;
```

## Properties

### body?

```ts
optional body?: DocumentLinkRequest;
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

The ID of the document to link.

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

The ID of the document store where the document is located.

---

### url

```ts
url: "/documents/{documentId}/links";
```
