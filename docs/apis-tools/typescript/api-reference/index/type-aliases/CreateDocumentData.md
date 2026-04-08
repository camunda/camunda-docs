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

Defined in: [gen/types.gen.ts:10106](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L10106)

## Properties

### body

```ts
body: object;
```

Defined in: [gen/types.gen.ts:10107](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L10107)

#### file

```ts
file: Blob | File;
```

#### metadata?

```ts
optional metadata?: DocumentMetadata;
```

---

### path?

```ts
optional path?: never;
```

Defined in: [gen/types.gen.ts:10111](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L10111)

---

### query?

```ts
optional query?: object;
```

Defined in: [gen/types.gen.ts:10112](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L10112)

#### documentId?

```ts
optional documentId?: DocumentId;
```

The ID of the document to upload. If not provided, a new ID will be generated. Specifying an existing ID will result in an error if the document already exists.

#### storeId?

```ts
optional storeId?: string;
```

The ID of the document store to upload the documents to. Currently, only a single document store is supported per cluster. However, this attribute is included to allow for potential future support of multiple document stores.

---

### url

```ts
url: "/documents";
```

Defined in: [gen/types.gen.ts:10123](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L10123)
