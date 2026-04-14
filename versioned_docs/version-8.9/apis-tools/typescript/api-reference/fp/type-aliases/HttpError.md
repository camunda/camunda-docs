---
title: "Type Alias: HttpError"
sidebar_label: "HttpError"
mdx:
  format: md
---

# Type Alias: HttpError

:::caution Technical Preview
The Functional Programming API is a **technical preview**. Its surface may change in future releases without following semver.
:::

```ts
type HttpError = object & Record<string, any>;
```

## Type Declaration

### body?

```ts
optional body?: any;
```

### message?

```ts
optional message?: string;
```

### name?

```ts
optional name?: string;
```

### status?

```ts
optional status?: number;
```
