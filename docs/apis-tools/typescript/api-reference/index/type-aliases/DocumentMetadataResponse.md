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

Defined in: [gen/types.gen.ts:2463](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2463)

Information about the document that is returned in responses.

## Properties

### contentType

```ts
contentType: string;
```

Defined in: [gen/types.gen.ts:2467](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2467)

The content type of the document.

***

### customProperties

```ts
customProperties: object;
```

Defined in: [gen/types.gen.ts:2491](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2491)

Custom properties of the document.

#### Index Signature

```ts
[key: string]: unknown
```

***

### expiresAt

```ts
expiresAt: string | null;
```

Defined in: [gen/types.gen.ts:2475](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2475)

The date and time when the document expires.

***

### fileName

```ts
fileName: string;
```

Defined in: [gen/types.gen.ts:2471](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2471)

The name of the file.

***

### processDefinitionId

```ts
processDefinitionId: ProcessDefinitionId | null;
```

Defined in: [gen/types.gen.ts:2483](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2483)

The ID of the process definition that created the document.

***

### processInstanceKey

```ts
processInstanceKey: ProcessInstanceKey | null;
```

Defined in: [gen/types.gen.ts:2487](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2487)

The key of the process instance that created the document.

***

### size

```ts
size: number;
```

Defined in: [gen/types.gen.ts:2479](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2479)

The size of the document in bytes.
