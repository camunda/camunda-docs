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

Defined in: [gen/types.gen.ts:2372](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2372)

## Properties

### camunda.document.type

```ts
camunda.document.type: "camunda";
```

Defined in: [gen/types.gen.ts:2376](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2376)

Document discriminator. Always set to "camunda".

---

### contentHash

```ts
contentHash: string | null;
```

Defined in: [gen/types.gen.ts:2388](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2388)

The hash of the document.

---

### documentId

```ts
documentId: DocumentId;
```

Defined in: [gen/types.gen.ts:2384](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2384)

The ID of the document.

---

### metadata

```ts
metadata: DocumentMetadataResponse;
```

Defined in: [gen/types.gen.ts:2389](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2389)

---

### storeId

```ts
storeId: string;
```

Defined in: [gen/types.gen.ts:2380](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2380)

The ID of the document store.
