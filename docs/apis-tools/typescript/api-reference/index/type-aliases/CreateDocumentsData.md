---
title: "Type Alias: CreateDocumentsData"
sidebar_label: "CreateDocumentsData"
mdx:
  format: md
---

# Type Alias: CreateDocumentsData

```ts
type CreateDocumentsData = object;
```

## Properties

### body

```ts
body: object;
```

#### files

```ts
files: (Blob | File)[];
```

The documents to upload.

#### metadataList?

```ts
optional metadataList?: DocumentMetadata[];
```

Optional JSON array of metadata object whose index aligns with each file entry. The metadata array must have the same length as the files array.

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

#### storeId?

```ts
optional storeId?: string;
```

The ID of the document store to upload the documents to. Currently, only a single document store is supported per cluster. However, this attribute is included to allow for potential future support of multiple document stores.

---

### url

```ts
url: "/documents/batch";
```
