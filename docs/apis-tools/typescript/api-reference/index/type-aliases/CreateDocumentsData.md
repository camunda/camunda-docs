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

Defined in: [gen/types.gen.ts:10007](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L10007)

## Properties

### body

```ts
body: object;
```

Defined in: [gen/types.gen.ts:10008](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L10008)

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

Defined in: [gen/types.gen.ts:10019](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L10019)

***

### query?

```ts
optional query: object;
```

Defined in: [gen/types.gen.ts:10020](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L10020)

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

Defined in: [gen/types.gen.ts:10026](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L10026)
