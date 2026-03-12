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

Defined in: [gen/types.gen.ts:2429](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L2429)

Information about the document.

## Properties

### contentType?

```ts
optional contentType: string;
```

Defined in: [gen/types.gen.ts:2433](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L2433)

The content type of the document.

***

### customProperties?

```ts
optional customProperties: object;
```

Defined in: [gen/types.gen.ts:2457](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L2457)

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

Defined in: [gen/types.gen.ts:2441](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L2441)

The date and time when the document expires.

***

### fileName?

```ts
optional fileName: string;
```

Defined in: [gen/types.gen.ts:2437](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L2437)

The name of the file.

***

### processDefinitionId?

```ts
optional processDefinitionId: ProcessDefinitionId;
```

Defined in: [gen/types.gen.ts:2449](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L2449)

The ID of the process definition that created the document.

***

### processInstanceKey?

```ts
optional processInstanceKey: ProcessInstanceKey;
```

Defined in: [gen/types.gen.ts:2453](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L2453)

The key of the process instance that created the document.

***

### size?

```ts
optional size: number;
```

Defined in: [gen/types.gen.ts:2445](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L2445)

The size of the document in bytes.
