---
title: "Type Alias: DeleteDocumentData"
sidebar_label: "DeleteDocumentData"
mdx:
  format: md
---

# Type Alias: DeleteDocumentData

```ts
type DeleteDocumentData = object;
```

## Properties

### body?

```ts
body?: never;
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

The ID of the document to delete.

---

### query?

```ts
query?: object;
```

#### storeId?

```ts
storeId?: string;
```

The ID of the document store to delete the document from.

---

### url

```ts
url: "/documents/{documentId}";
```
