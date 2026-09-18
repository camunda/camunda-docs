---
title: "Type Alias: CreateClusterVariableRequest"
sidebar_label: "CreateClusterVariableRequest"
mdx:
  format: md
---

# Type Alias: CreateClusterVariableRequest

```ts
type CreateClusterVariableRequest = object;
```

## Properties

### kind?

```ts
optional kind?: ClusterVariableKindEnum;
```

The kind of the cluster variable. Defaults to JSON if not specified.

---

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

### name

```ts
name: ClusterVariableName;
```

The name of the cluster variable. Must be unique within its scope (global or tenant-specific).

---

### value

```ts
value: object;
```

The value of the cluster variable. Can be any JSON object or primitive value. Will be serialized as a JSON string in responses.

#### Index Signature

```ts
[key: string]: unknown
```
