---
title: "Type Alias: AdvancedGlobalListenerSourceFilter"
sidebar_label: "AdvancedGlobalListenerSourceFilter"
mdx:
  format: md
---

# Type Alias: AdvancedGlobalListenerSourceFilter

```ts
type AdvancedGlobalListenerSourceFilter = object;
```

Advanced filter

Advanced global listener source filter.

## Properties

### $eq?

```ts
$eq?: GlobalListenerSourceEnum;
```

Checks for equality with the provided value.

---

### $exists?

```ts
$exists?: boolean;
```

Checks if the current property exists.

---

### $in?

```ts
$in?: GlobalListenerSourceEnum[];
```

Checks if the property matches any of the provided values.

---

### $like?

```ts
$like?: LikeFilter;
```

---

### $neq?

```ts
$neq?: GlobalListenerSourceEnum;
```

Checks for inequality with the provided value.
