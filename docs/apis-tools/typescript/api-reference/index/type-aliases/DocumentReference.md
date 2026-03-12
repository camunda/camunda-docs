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

Defined in: [gen/types.gen.ts:2376](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L2376)

## Properties

### camunda.document.type

```ts
camunda.document.type: "camunda";
```

Defined in: [gen/types.gen.ts:2380](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L2380)

Document discriminator. Always set to "camunda".

***

### contentHash

```ts
contentHash: string | null;
```

Defined in: [gen/types.gen.ts:2392](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L2392)

The hash of the document.

***

### documentId

```ts
documentId: DocumentId;
```

Defined in: [gen/types.gen.ts:2388](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L2388)

The ID of the document.

***

### metadata

```ts
metadata: DocumentMetadataResponse;
```

Defined in: [gen/types.gen.ts:2393](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L2393)

***

### storeId

```ts
storeId: string;
```

Defined in: [gen/types.gen.ts:2384](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L2384)

The ID of the document store.
