---
title: "Type Alias: VariableFilter"
sidebar_label: "VariableFilter"
mdx:
  format: md
---

# Type Alias: VariableFilter

```ts
type VariableFilter = object;
```

Variable filter request.

## Properties

### isTruncated?

```ts
optional isTruncated?: boolean;
```

Whether the value is truncated or not.

---

### name?

```ts
optional name?: StringFilterProperty;
```

Name of the variable.

---

### processInstanceKey?

```ts
optional processInstanceKey?: ProcessInstanceKeyFilterProperty;
```

The key of the process instance of this variable.

---

### scopeKey?

```ts
optional scopeKey?: ScopeKeyFilterProperty;
```

The key of the scope that defines where this variable is directly defined. This can be a
process instance key (for process-level variables) or an element instance key (for local
variables scoped to tasks, subprocesses, gateways, events, etc.). Use this filter to
find variables directly defined in specific scopes. Note that this does not include
variables from parent scopes that would be visible through the scope hierarchy.

---

### tenantId?

```ts
optional tenantId?: TenantId;
```

Tenant ID of this variable.

---

### value?

```ts
optional value?: StringFilterProperty;
```

The value of the variable.
Variable values in filters need to be in serialized JSON format. For example, a variable
with string value `myValue` can be found with the filter value `"myValue"`. Consider
appropriate escaping for special characters in JSON strings when constructing filter values.

---

### variableKey?

```ts
optional variableKey?: VariableKeyFilterProperty;
```

The key for this variable.
