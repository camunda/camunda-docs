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

Defined in: [gen/types.gen.ts:10121](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L10121)

## Properties

### body

```ts
body: object;
```

Defined in: [gen/types.gen.ts:10122](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L10122)

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

***

### path?

```ts
optional path: never;
```

Defined in: [gen/types.gen.ts:10133](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L10133)

***

### query?

```ts
optional query: object;
```

Defined in: [gen/types.gen.ts:10134](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L10134)

#### storeId?

```ts
optional storeId: string;
```

The ID of the document store to upload the documents to. Currently, only a single document store is supported per cluster. However, this attribute is included to allow for potential future support of multiple document stores.

***

### url

```ts
url: "/documents/batch";
```

Defined in: [gen/types.gen.ts:10140](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L10140)
