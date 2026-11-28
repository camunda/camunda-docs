---
title: "Type Alias: SearchVariableHistoryData"
sidebar_label: "SearchVariableHistoryData"
mdx:
  format: md
---

# Type Alias: SearchVariableHistoryData

```ts
type SearchVariableHistoryData = object;
```

## Properties

### body?

```ts
body?: VariableHistoryItemSearchQuery;
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

When true (default), long variable values in the response are truncated. When false, full variable values are returned where available.

---

### url

```ts
url: "/variables/history/search";
```
