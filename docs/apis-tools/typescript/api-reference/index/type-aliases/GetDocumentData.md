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

Defined in: [gen/types.gen.ts:10210](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L10210)

## Properties

### body?

```ts
optional body: never;
```

Defined in: [gen/types.gen.ts:10211](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L10211)

***

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:10212](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L10212)

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

Defined in: [gen/types.gen.ts:10218](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L10218)

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

Defined in: [gen/types.gen.ts:10229](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L10229)
