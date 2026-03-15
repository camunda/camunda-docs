---
title: "Type Alias: ScopeKeyFilterProperty"
sidebar_label: "ScopeKeyFilterProperty"
mdx:
  format: md
---

# Type Alias: ScopeKeyFilterProperty

```ts
type ScopeKeyFilterProperty = 
  | ScopeKeyExactMatch
  | AdvancedScopeKeyFilter;
```

Defined in: [gen/types.gen.ts:4909](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4909)

ScopeKey property with full advanced search capabilities. Filter by the key of the
element instance or process instance that defines the scope of a variable.
