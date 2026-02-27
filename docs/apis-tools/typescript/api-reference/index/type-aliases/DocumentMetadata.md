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

Defined in: [gen/types.gen.ts:2322](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2322)

Information about the document.

## Properties

### contentType?

```ts
optional contentType: string;
```

Defined in: [gen/types.gen.ts:2326](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2326)

The content type of the document.

---

### customProperties?

```ts
optional customProperties: object;
```

Defined in: [gen/types.gen.ts:2350](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2350)

Custom properties of the document.

#### Index Signature

```ts
[key: string]: unknown
```

---

### expiresAt?

```ts
optional expiresAt: string;
```

Defined in: [gen/types.gen.ts:2334](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2334)

The date and time when the document expires.

---

### fileName?

```ts
optional fileName: string;
```

Defined in: [gen/types.gen.ts:2330](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2330)

The name of the file.

---

### processDefinitionId?

```ts
optional processDefinitionId: ProcessDefinitionId;
```

Defined in: [gen/types.gen.ts:2342](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2342)

The ID of the process definition that created the document.

---

### processInstanceKey?

```ts
optional processInstanceKey: ProcessInstanceKey;
```

Defined in: [gen/types.gen.ts:2346](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2346)

The key of the process instance that created the document.

---

### size?

```ts
optional size: number;
```

Defined in: [gen/types.gen.ts:2338](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2338)

The size of the document in bytes.
