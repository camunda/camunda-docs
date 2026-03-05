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

Defined in: [gen/types.gen.ts:10096](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L10096)

## Properties

### body?

```ts
optional body: never;
```

Defined in: [gen/types.gen.ts:10097](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L10097)

***

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:10098](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L10098)

#### documentId

```ts
documentId: DocumentId;
```

The ID of the document to download.

***

### query?

```ts
optional query: object;
```

Defined in: [gen/types.gen.ts:10104](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L10104)

#### contentHash?

```ts
optional contentHash: string;
```

The hash of the document content that was computed by the document store during upload. The hash is part of the document reference that is returned when uploading a document. If the client fails to provide the correct hash, the request will be rejected.

#### storeId?

```ts
optional storeId: string;
```

The ID of the document store to download the document from.

***

### url

```ts
url: "/documents/{documentId}";
```

Defined in: [gen/types.gen.ts:10115](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L10115)
