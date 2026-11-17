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

Information about the document that is returned in responses.

## Properties

### contentType

```ts
contentType: string;
```

The content type of the document.

---

### customProperties

```ts
customProperties: object;
```

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

The date and time when the document expires.

---

### fileName

```ts
fileName: string;
```

The name of the file.

---

### processDefinitionId

```ts
processDefinitionId: ProcessDefinitionId | null;
```

The ID of the process definition that created the document.

---

### processInstanceKey

```ts
processInstanceKey: ProcessInstanceKey | null;
```

The key of the process instance that created the document.

---

### size

```ts
size: number;
```

The size of the document in bytes.
