---
title: "Type Alias: CreateDocumentData"
sidebar_label: "CreateDocumentData"
mdx:
  format: md
---

# Type Alias: CreateDocumentData

```ts
type CreateDocumentData = object;
```

## Properties

### body

```ts
body: object;
```

#### file

```ts
file: Blob | File;
```

#### metadata?

```ts
optional metadata?: DocumentMetadata;
```

---

### path?

```ts
optional path?: never;
```

---

### query?

```ts
optional query?: object;
```

#### documentId?

```ts
optional documentId?: DocumentId;
```

The ID of the document to upload. If not provided, a new ID will be generated. Specifying an existing ID will result in an error if the document already exists.

#### storeId?

```ts
optional storeId?: string;
```

The ID of the document store to upload the documents to. Currently, only a single document store is supported per cluster. However, this attribute is included to allow for potential future support of multiple document stores.

---

### url

```ts
url: "/documents";
```
