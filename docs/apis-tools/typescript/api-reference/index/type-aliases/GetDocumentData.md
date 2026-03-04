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

Defined in: [gen/types.gen.ts:10145](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L10145)

## Properties

### body?

```ts
optional body: never;
```

Defined in: [gen/types.gen.ts:10146](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L10146)

---

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:10147](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L10147)

#### documentId

```ts
documentId: DocumentId;
```

The ID of the document to download.

---

### query?

```ts
optional query: object;
```

Defined in: [gen/types.gen.ts:10153](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L10153)

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

---

### url

```ts
url: "/documents/{documentId}";
```

Defined in: [gen/types.gen.ts:10164](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L10164)
