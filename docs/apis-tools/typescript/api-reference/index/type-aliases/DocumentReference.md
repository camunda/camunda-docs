---
title: "Type Alias: DocumentReference"
sidebar_label: "DocumentReference"
mdx:
  format: md
---

# Type Alias: DocumentReference

```ts
type DocumentReference = object;
```

Defined in: [gen/types.gen.ts:2269](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2269)

## Properties

### camunda.document.type?

```ts
optional camunda.document.type: "camunda";
```

Defined in: [gen/types.gen.ts:2273](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2273)

Document discriminator. Always set to "camunda".

---

### contentHash?

```ts
optional contentHash: string;
```

Defined in: [gen/types.gen.ts:2285](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2285)

The hash of the document.

---

### documentId?

```ts
optional documentId: DocumentId;
```

Defined in: [gen/types.gen.ts:2281](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2281)

The ID of the document.

---

### metadata?

```ts
optional metadata: DocumentMetadata;
```

Defined in: [gen/types.gen.ts:2286](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2286)

---

### storeId?

```ts
optional storeId: string;
```

Defined in: [gen/types.gen.ts:2277](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2277)

The ID of the document store.
