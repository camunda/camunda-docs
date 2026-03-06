---
title: "Type Alias: DocumentMetadata"
sidebar_label: "DocumentMetadata"
mdx:
  format: md
---

# Type Alias: DocumentMetadata

```ts
type DocumentMetadata = object;
```

Defined in: [gen/types.gen.ts:2427](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2427)

Information about the document.

## Properties

### contentType?

```ts
optional contentType: string;
```

Defined in: [gen/types.gen.ts:2431](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2431)

The content type of the document.

***

### customProperties?

```ts
optional customProperties: object;
```

Defined in: [gen/types.gen.ts:2455](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2455)

Custom properties of the document.

#### Index Signature

```ts
[key: string]: unknown
```

***

### expiresAt?

```ts
optional expiresAt: string;
```

Defined in: [gen/types.gen.ts:2439](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2439)

The date and time when the document expires.

***

### fileName?

```ts
optional fileName: string;
```

Defined in: [gen/types.gen.ts:2435](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2435)

The name of the file.

***

### processDefinitionId?

```ts
optional processDefinitionId: ProcessDefinitionId;
```

Defined in: [gen/types.gen.ts:2447](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2447)

The ID of the process definition that created the document.

***

### processInstanceKey?

```ts
optional processInstanceKey: ProcessInstanceKey;
```

Defined in: [gen/types.gen.ts:2451](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2451)

The key of the process instance that created the document.

***

### size?

```ts
optional size: number;
```

Defined in: [gen/types.gen.ts:2443](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2443)

The size of the document in bytes.
