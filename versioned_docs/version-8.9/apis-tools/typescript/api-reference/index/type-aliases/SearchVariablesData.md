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
optional body?: SearchQueryRequest & object;
```

Variable search query request.

#### Type Declaration

##### filter?

```ts
optional filter?: VariableFilter;
```

The variable search filters.

##### sort?

```ts
optional sort?: object[];
```

Sort field criteria.

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
url: "/variables/search";
```
