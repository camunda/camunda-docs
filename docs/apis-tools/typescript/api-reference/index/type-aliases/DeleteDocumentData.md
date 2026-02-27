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

Defined in: [gen/types.gen.ts:10106](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L10106)

## Properties

### body?

```ts
optional body: never;
```

Defined in: [gen/types.gen.ts:10107](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L10107)

---

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:10108](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L10108)

#### documentId

```ts
documentId: DocumentId;
```

The ID of the document to delete.

---

### query?

```ts
optional query: object;
```

Defined in: [gen/types.gen.ts:10114](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L10114)

#### storeId?

```ts
optional storeId: string;
```

The ID of the document store to delete the document from.

---

### url

```ts
url: "/documents/{documentId}";
```

Defined in: [gen/types.gen.ts:10120](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L10120)
