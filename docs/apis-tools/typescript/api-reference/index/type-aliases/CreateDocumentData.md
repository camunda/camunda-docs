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

Defined in: [gen/types.gen.ts:10012](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L10012)

## Properties

### body

```ts
body: object;
```

Defined in: [gen/types.gen.ts:10013](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L10013)

#### file

```ts
file: Blob | File;
```

#### metadata?

```ts
optional metadata: DocumentMetadata;
```

---

### path?

```ts
optional path: never;
```

Defined in: [gen/types.gen.ts:10017](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L10017)

---

### query?

```ts
optional query: object;
```

Defined in: [gen/types.gen.ts:10018](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L10018)

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

---

### url

```ts
url: "/documents";
```

Defined in: [gen/types.gen.ts:10029](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L10029)
