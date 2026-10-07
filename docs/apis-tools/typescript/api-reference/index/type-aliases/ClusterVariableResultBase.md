---
title: "Type Alias: ClusterVariableResultBase"
sidebar_label: "ClusterVariableResultBase"
mdx:
  format: md
---

# Type Alias: ClusterVariableResultBase

```ts
type ClusterVariableResultBase = object;
```

Cluster variable response item.

## Properties

### kind

```ts
kind: ClusterVariableKindEnum;
```

---

### metadata

```ts
metadata: object;
```

A generic key-value metadata bag attached to the cluster variable. Values are strings or numbers.

#### Index Signature

```ts
[key: string]: string | number
```

---

### name

```ts
name: ClusterVariableName;
```

The name of the cluster variable. Unique within its scope (global or tenant-specific).

---

### scope

```ts
scope: ClusterVariableScopeEnum;
```

---

### tenantId

```ts
tenantId: string | null;
```

Only provided if the cluster variable scope is TENANT. Null for global scope variables.
