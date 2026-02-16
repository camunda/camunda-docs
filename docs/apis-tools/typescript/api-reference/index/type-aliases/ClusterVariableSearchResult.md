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

Defined in: [gen/types.gen.ts:1145](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1145)

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
