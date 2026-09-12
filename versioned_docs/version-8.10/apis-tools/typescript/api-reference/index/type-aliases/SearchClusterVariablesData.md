---
title: "Type Alias: SearchClusterVariablesData"
sidebar_label: "SearchClusterVariablesData"
mdx:
  format: md
---

# Type Alias: SearchClusterVariablesData

```ts
type SearchClusterVariablesData = object;
```

## Properties

### body?

```ts
optional body?: ClusterVariableSearchQueryRequest;
```

---

### path?

```ts
optional path?: never;
```

---

### query?

```ts
optional query?: object;
```

#### truncateValues?

```ts
optional truncateValues?: boolean;
```

When true (default), long variable values in the response are truncated. When false, full variable values are returned.

---

### url

```ts
url: "/cluster-variables/search";
```
