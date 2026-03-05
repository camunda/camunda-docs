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

Defined in: [gen/types.gen.ts:4841](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4841)

ScopeKey property with full advanced search capabilities. Filter by the key of the
element instance or process instance that defines the scope of a variable.
