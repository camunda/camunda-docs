---
title: "Type Alias: DocumentCreationBatchResponse"
sidebar_label: "DocumentCreationBatchResponse"
mdx:
  format: md
---

# Type Alias: DocumentCreationBatchResponse

```ts
type DocumentCreationBatchResponse = object;
```

Defined in: [gen/types.gen.ts:2413](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2413)

## Properties

### createdDocuments

```ts
createdDocuments: DocumentReference[];
```

Defined in: [gen/types.gen.ts:2421](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2421)

Documents that failed creation.

***

### failedDocuments

```ts
failedDocuments: DocumentCreationFailureDetail[];
```

Defined in: [gen/types.gen.ts:2417](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2417)

Documents that were successfully created.
