---
title: "Type Alias: ClusterVariableSearchResult"
sidebar_label: "ClusterVariableSearchResult"
mdx:
  format: md
---

# Type Alias: ClusterVariableSearchResult

```ts
type ClusterVariableSearchResult = ClusterVariableResultBase & object;
```

Defined in: [gen/types.gen.ts:1178](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1178)

Cluster variable search response item.

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

Value of this cluster variable. Can be truncated.
