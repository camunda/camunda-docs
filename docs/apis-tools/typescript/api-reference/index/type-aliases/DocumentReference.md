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

Defined in: [gen/types.gen.ts:2374](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2374)

## Properties

### camunda.document.type

```ts
camunda.document.type: "camunda";
```

Defined in: [gen/types.gen.ts:2378](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2378)

Document discriminator. Always set to "camunda".

***

### contentHash

```ts
contentHash: string | null;
```

Defined in: [gen/types.gen.ts:2390](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2390)

The hash of the document.

***

### documentId

```ts
documentId: DocumentId;
```

Defined in: [gen/types.gen.ts:2386](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2386)

The ID of the document.

***

### metadata

```ts
metadata: DocumentMetadataResponse;
```

Defined in: [gen/types.gen.ts:2391](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2391)

***

### storeId

```ts
storeId: string;
```

Defined in: [gen/types.gen.ts:2382](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2382)

The ID of the document store.
