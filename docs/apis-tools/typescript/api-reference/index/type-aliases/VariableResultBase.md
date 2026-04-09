---
title: "Type Alias: VariableResultBase"
sidebar_label: "VariableResultBase"
mdx:
  format: md
---

# Type Alias: VariableResultBase

```ts
type VariableResultBase = object;
```

Variable response item.

## Properties

### name

```ts
name: string;
```

Name of this variable.

---

### processInstanceKey

```ts
processInstanceKey: ProcessInstanceKey;
```

The key of the process instance of this variable.

---

### rootProcessInstanceKey

```ts
rootProcessInstanceKey: ProcessInstanceKey | null;
```

The key of the root process instance. The root process instance is the top-level
ancestor in the process instance hierarchy. This field is only present for data
belonging to process instance hierarchies created in version 8.9 or later.

---

### scopeKey

```ts
scopeKey: ScopeKey;
```

The key of the scope where this variable is directly defined. For process-level
variables, this is the process instance key. For local variables, this is the key of the
specific element instance (task, subprocess, gateway, event, etc.) where the variable is
directly defined.

---

### tenantId

```ts
tenantId: TenantId;
```

Tenant ID of this variable.

---

### variableKey

```ts
variableKey: VariableKey;
```

The key for this variable.
