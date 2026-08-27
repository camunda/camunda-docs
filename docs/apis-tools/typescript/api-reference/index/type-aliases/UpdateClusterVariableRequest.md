---
title: "Type Alias: UpdateClusterVariableRequest"
sidebar_label: "UpdateClusterVariableRequest"
mdx:
  format: md
---

# Type Alias: UpdateClusterVariableRequest

```ts
type UpdateClusterVariableRequest = object;
```

## Properties

### metadata?

```ts
optional metadata?: object;
```

A generic key-value metadata bag attached to the cluster variable. Values must be strings or numbers. Limited to 100 entries and a configurable maximum serialized size (default: 100 entries at max key length of a cluster variable name (256 chars) plus the maximum value length, 8192 characters).

#### Index Signature

```ts
[key: string]: string | number
```

---

### value

```ts
value: object;
```

The new value of the cluster variable. Can be any JSON object or primitive value. Will be serialized as a JSON string in responses.

#### Index Signature

```ts
[key: string]: unknown
```
