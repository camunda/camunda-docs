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

Defined in: [gen/types.gen.ts:10189](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L10189)

## Properties

### body?

```ts
optional body: DocumentLinkRequest;
```

Defined in: [gen/types.gen.ts:10190](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L10190)

---

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:10191](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L10191)

#### documentId

```ts
documentId: DocumentId;
```

The ID of the document to link.

---

### query?

```ts
optional query: object;
```

Defined in: [gen/types.gen.ts:10197](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L10197)

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

---

### url

```ts
url: "/documents/{documentId}/links";
```

Defined in: [gen/types.gen.ts:10208](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L10208)
