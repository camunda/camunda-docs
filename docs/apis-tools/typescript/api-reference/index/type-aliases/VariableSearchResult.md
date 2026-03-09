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

Defined in: [gen/types.gen.ts:7313](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L7313)

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
