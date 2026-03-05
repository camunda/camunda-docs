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

Defined in: [gen/types.gen.ts:10057](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L10057)

## Properties

### body?

```ts
optional body: never;
```

Defined in: [gen/types.gen.ts:10058](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L10058)

***

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:10059](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L10059)

#### documentId

```ts
documentId: DocumentId;
```

The ID of the document to delete.

***

### query?

```ts
optional query: object;
```

Defined in: [gen/types.gen.ts:10065](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L10065)

#### storeId?

```ts
optional storeId: string;
```

The ID of the document store to delete the document from.

***

### url

```ts
url: "/documents/{documentId}";
```

Defined in: [gen/types.gen.ts:10071](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L10071)
