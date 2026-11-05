---
title: "Type Alias: SearchVariablesData"
sidebar_label: "SearchVariablesData"
mdx:
  format: md
---

# Type Alias: SearchVariablesData

```ts
type SearchVariablesData = object;
```

## Properties

### body?

```ts
body?: VariableSearchQuery;
```

---

### path?

```ts
path?: never;
```

---

### query?

```ts
query?: object;
```

#### truncateValues?

```ts
truncateValues?: boolean;
```

When true (default), long variable values in the response are truncated. When false, full variable values are returned.

---

### url

```ts
url: "/variables/search";
```
