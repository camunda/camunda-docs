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

Defined in: [gen/types.gen.ts:10239](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L10239)

## Properties

### body?

```ts
optional body?: never;
```

Defined in: [gen/types.gen.ts:10240](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L10240)

---

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:10241](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L10241)

#### documentId

```ts
documentId: DocumentId;
```

The ID of the document to download.

---

### query?

```ts
optional query?: object;
```

Defined in: [gen/types.gen.ts:10247](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L10247)

#### contentHash?

```ts
optional contentHash?: string;
```

The hash of the document content that was computed by the document store during upload. The hash is part of the document reference that is returned when uploading a document. If the client fails to provide the correct hash, the request will be rejected.

#### storeId?

```ts
optional storeId?: string;
```

The ID of the document store to download the document from.

---

### url

```ts
url: "/documents/{documentId}";
```

Defined in: [gen/types.gen.ts:10258](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L10258)
