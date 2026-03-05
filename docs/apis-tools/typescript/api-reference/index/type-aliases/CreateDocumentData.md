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

Defined in: [gen/types.gen.ts:9963](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L9963)

## Properties

### body

```ts
body: object;
```

Defined in: [gen/types.gen.ts:9964](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L9964)

#### file

```ts
file: Blob | File;
```

#### metadata?

```ts
optional metadata: DocumentMetadata;
```

***

### path?

```ts
optional path: never;
```

Defined in: [gen/types.gen.ts:9968](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L9968)

***

### query?

```ts
optional query: object;
```

Defined in: [gen/types.gen.ts:9969](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L9969)

#### documentId?

```ts
optional documentId: DocumentId;
```

The ID of the document to upload. If not provided, a new ID will be generated. Specifying an existing ID will result in an error if the document already exists.

#### storeId?

```ts
optional storeId: string;
```

The ID of the document store to upload the documents to. Currently, only a single document store is supported per cluster. However, this attribute is included to allow for potential future support of multiple document stores.

***

### url

```ts
url: "/documents";
```

Defined in: [gen/types.gen.ts:9980](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L9980)
