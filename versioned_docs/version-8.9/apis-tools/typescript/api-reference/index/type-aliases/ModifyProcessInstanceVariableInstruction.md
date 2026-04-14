---
title: "Type Alias: ModifyProcessInstanceVariableInstruction"
sidebar_label: "ModifyProcessInstanceVariableInstruction"
mdx:
  format: md
---

# Type Alias: ModifyProcessInstanceVariableInstruction

```ts
type ModifyProcessInstanceVariableInstruction = object;
```

Instruction describing which variables to create or update.

## Properties

### scopeId?

```ts
optional scopeId?: string;
```

The id of the element in which scope the variables should be created.
Leave empty to create the variables in the global scope of the process instance.

---

### variables

```ts
variables: object;
```

JSON document that will instantiate the variables at the scope defined by the scopeId.
It must be a JSON object, as variables will be mapped in a key-value fashion.

#### Index Signature

```ts
[key: string]: unknown
```
