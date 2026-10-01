---
title: "Type Alias: AgentInstanceDocumentContent"
sidebar_label: "AgentInstanceDocumentContent"
mdx:
  format: md
---

# Type Alias: AgentInstanceDocumentContent

```ts
type AgentInstanceDocumentContent = object;
```

Document content

A Camunda Document Store reference content block.

## Properties

### contentType

```ts
contentType: string;
```

The content type discriminator.

---

### documentReference

```ts
documentReference: DocumentReference;
```

A reference to a document stored in the Camunda Document Store.
