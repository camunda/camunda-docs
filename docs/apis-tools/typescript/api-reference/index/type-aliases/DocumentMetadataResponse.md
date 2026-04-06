---
title: "Type Alias: DocumentMetadataResponse"
sidebar_label: "DocumentMetadataResponse"
mdx:
  format: md
---

# Type Alias: DocumentMetadataResponse

```ts
type DocumentMetadataResponse = object;
```

Defined in: [gen/types.gen.ts:2461](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2461)

Information about the document that is returned in responses.

## Properties

### contentType

```ts
contentType: string;
```

Defined in: [gen/types.gen.ts:2465](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2465)

The content type of the document.

---

### customProperties

```ts
customProperties: object;
```

Defined in: [gen/types.gen.ts:2489](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2489)

Custom properties of the document.

#### Index Signature

```ts
[key: string]: unknown
```

---

### expiresAt

```ts
expiresAt: string | null;
```

Defined in: [gen/types.gen.ts:2473](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2473)

The date and time when the document expires.

---

### fileName

```ts
fileName: string;
```

Defined in: [gen/types.gen.ts:2469](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2469)

The name of the file.

---

### processDefinitionId

```ts
processDefinitionId: ProcessDefinitionId | null;
```

Defined in: [gen/types.gen.ts:2481](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2481)

The ID of the process definition that created the document.

---

### processInstanceKey

```ts
processInstanceKey: ProcessInstanceKey | null;
```

Defined in: [gen/types.gen.ts:2485](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2485)

The key of the process instance that created the document.

---

### size

```ts
size: number;
```

Defined in: [gen/types.gen.ts:2477](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2477)

The size of the document in bytes.
