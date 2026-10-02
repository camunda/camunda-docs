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

## Properties

### camunda.document.type

```ts
camunda.document.type: "camunda";
```

Document discriminator. Always set to "camunda".

---

### contentHash

```ts
contentHash: string | null;
```

The hash of the document.

---

### documentId

```ts
documentId: DocumentId;
```

The ID of the document.

---

### metadata

```ts
metadata: DocumentMetadataResponse;
```

---

### storeId

```ts
storeId: string;
```

The ID of the document store.
