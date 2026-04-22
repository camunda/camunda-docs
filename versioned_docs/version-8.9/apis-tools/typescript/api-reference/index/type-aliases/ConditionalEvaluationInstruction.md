---
title: "Type Alias: ConditionalEvaluationInstruction"
sidebar_label: "ConditionalEvaluationInstruction"
mdx:
  format: md
---

# Type Alias: ConditionalEvaluationInstruction

```ts
type ConditionalEvaluationInstruction = object;
```

## Properties

### processDefinitionKey?

```ts
optional processDefinitionKey?: ProcessDefinitionKey;
```

Used to evaluate root-level conditional start events of the process definition with the given key.

---

### tenantId?

```ts
optional tenantId?: TenantId;
```

Used to evaluate root-level conditional start events for a tenant with the given ID.
This will only evaluate root-level conditional start events of process definitions which belong to the tenant.

---

### variables

```ts
variables: object;
```

JSON object representing the variables to use for evaluation of the conditions and to pass to the process instances that have been triggered.

#### Index Signature

```ts
[key: string]: unknown
```
