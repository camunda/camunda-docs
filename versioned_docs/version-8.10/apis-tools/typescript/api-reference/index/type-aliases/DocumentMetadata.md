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

Information about the document.

## Properties

### contentType?

```ts
optional contentType?: string;
```

The content type of the document.

---

### customProperties?

```ts
optional customProperties?: object;
```

Custom properties of the document.

#### Index Signature

```ts
[key: string]: unknown
```

---

### expiresAt?

```ts
optional expiresAt?: string;
```

The date and time when the document expires.

---

### fileName?

```ts
optional fileName?: string;
```

The name of the file.

---

### processDefinitionId?

```ts
optional processDefinitionId?: ProcessDefinitionId;
```

The ID of the process definition that created the document.

---

### processInstanceKey?

```ts
optional processInstanceKey?: ProcessInstanceKey;
```

The key of the process instance that created the document.

---

### size?

```ts
optional size?: number;
```

The size of the document in bytes.
