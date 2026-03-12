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

Defined in: [gen/types.gen.ts:10077](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L10077)

## Properties

### body

```ts
body: object;
```

Defined in: [gen/types.gen.ts:10078](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L10078)

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

Defined in: [gen/types.gen.ts:10082](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L10082)

***

### query?

```ts
optional query: object;
```

Defined in: [gen/types.gen.ts:10083](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L10083)

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

Defined in: [gen/types.gen.ts:10094](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L10094)
