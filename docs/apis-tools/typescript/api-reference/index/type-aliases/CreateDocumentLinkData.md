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

Defined in: [gen/types.gen.ts:10140](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L10140)

## Properties

### body?

```ts
optional body: DocumentLinkRequest;
```

Defined in: [gen/types.gen.ts:10141](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L10141)

***

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:10142](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L10142)

#### documentId

```ts
documentId: DocumentId;
```

The ID of the document to link.

***

### query?

```ts
optional query: object;
```

Defined in: [gen/types.gen.ts:10148](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L10148)

#### contentHash?

```ts
optional contentHash: string;
```

The hash of the document content that was computed by the document store during upload. The hash is part of the document reference that is returned when uploading a document. If the client fails to provide the correct hash, the request will be rejected.

#### storeId?

```ts
optional storeId: string;
```

The ID of the document store where the document is located.

***

### url

```ts
url: "/documents/{documentId}/links";
```

Defined in: [gen/types.gen.ts:10159](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L10159)
