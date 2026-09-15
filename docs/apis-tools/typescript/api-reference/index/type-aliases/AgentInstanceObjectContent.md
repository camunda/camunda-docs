---
title: "Type Alias: AgentInstanceObjectContent"
sidebar_label: "AgentInstanceObjectContent"
mdx:
  format: md
---

# Type Alias: AgentInstanceObjectContent

```ts
type AgentInstanceObjectContent = object;
```

Object content

An arbitrary structured content block. Accepts any valid JSON value:
objects, arrays, numbers, booleans, or strings.
Use TEXT content for human-readable natural language;
use OBJECT content for machine-readable structured data.

## Properties

### contentType

```ts
contentType: string;
```

The content type discriminator.

---

### object

```ts
object: unknown;
```

Arbitrary structured content — any valid JSON value (object, array, number, boolean, or string).
