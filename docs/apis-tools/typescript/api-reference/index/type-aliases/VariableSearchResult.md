---
title: "Type Alias: VariableSearchResult"
sidebar_label: "VariableSearchResult"
mdx:
  format: md
---

# Type Alias: VariableSearchResult

```ts
type VariableSearchResult = VariableResultBase & object;
```

Defined in: [gen/types.gen.ts:7986](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7986)

Variable search response item.

## Type Declaration

### isTruncated?

```ts
optional isTruncated: boolean;
```

Whether the value is truncated or not.

### value?

```ts
optional value: string;
```

Value of this variable. Can be truncated.
