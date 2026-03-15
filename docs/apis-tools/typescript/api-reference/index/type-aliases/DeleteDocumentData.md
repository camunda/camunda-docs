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

Defined in: [gen/types.gen.ts:10171](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L10171)

## Properties

### body?

```ts
optional body: never;
```

Defined in: [gen/types.gen.ts:10172](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L10172)

***

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:10173](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L10173)

#### documentId

```ts
documentId: DocumentId;
```

The ID of the document to delete.

***

### query?

```ts
optional query: object;
```

Defined in: [gen/types.gen.ts:10179](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L10179)

#### storeId?

```ts
optional storeId: string;
```

The ID of the document store to delete the document from.

***

### url

```ts
url: "/documents/{documentId}";
```

Defined in: [gen/types.gen.ts:10185](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L10185)
