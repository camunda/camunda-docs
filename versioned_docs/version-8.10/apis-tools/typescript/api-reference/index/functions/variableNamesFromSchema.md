---
title: "Function: variableNamesFromSchema()"
sidebar_label: "variableNamesFromSchema()"
mdx:
  format: md
---

# Function: variableNamesFromSchema()

```ts
function variableNamesFromSchema(schema): string[];
```

The declared variable names, in declaration order. These key the `name $in [...]` filter.

Guards against non-schema inputs (e.g. a JS caller, or an `any` cast) so the failure is a clear,
actionable error rather than an opaque `Cannot read properties of undefined` deep in paging.

## Parameters

### schema

[`AnyVariableSchema`](../type-aliases/AnyVariableSchema.md)

## Returns

`string`[]
