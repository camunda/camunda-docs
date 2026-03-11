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

Defined in: [gen/types.gen.ts:10056](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L10056)

## Properties

### body

```ts
body: object;
```

Defined in: [gen/types.gen.ts:10057](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L10057)

#### files

```ts
files: (Blob | File)[];
```

The documents to upload.

#### metadataList?

```ts
optional metadataList: DocumentMetadata[];
```

Optional JSON array of metadata object whose index aligns with each file entry. The metadata array must have the same length as the files array.

---

### path?

```ts
optional path: never;
```

Defined in: [gen/types.gen.ts:10068](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L10068)

---

### query?

```ts
optional query: object;
```

Defined in: [gen/types.gen.ts:10069](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L10069)

#### storeId?

```ts
optional storeId: string;
```

The ID of the document store to upload the documents to. Currently, only a single document store is supported per cluster. However, this attribute is included to allow for potential future support of multiple document stores.

---

### url

```ts
url: "/documents/batch";
```

Defined in: [gen/types.gen.ts:10075](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L10075)
