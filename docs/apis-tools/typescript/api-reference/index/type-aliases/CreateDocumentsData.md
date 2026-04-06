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

Defined in: [gen/types.gen.ts:10150](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L10150)

## Properties

### body

```ts
body: object;
```

Defined in: [gen/types.gen.ts:10151](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L10151)

#### files

```ts
files: (Blob | File)[];
```

The documents to upload.

#### metadataList?

```ts
optional metadataList?: DocumentMetadata[];
```

Optional JSON array of metadata object whose index aligns with each file entry. The metadata array must have the same length as the files array.

---

### path?

```ts
optional path?: never;
```

Defined in: [gen/types.gen.ts:10162](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L10162)

---

### query?

```ts
optional query?: object;
```

Defined in: [gen/types.gen.ts:10163](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L10163)

#### storeId?

```ts
optional storeId?: string;
```

The ID of the document store to upload the documents to. Currently, only a single document store is supported per cluster. However, this attribute is included to allow for potential future support of multiple document stores.

---

### url

```ts
url: "/documents/batch";
```

Defined in: [gen/types.gen.ts:10169](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L10169)
