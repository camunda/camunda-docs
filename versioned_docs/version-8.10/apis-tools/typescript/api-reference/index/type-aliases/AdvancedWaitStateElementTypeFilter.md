---
title: "Type Alias: AdvancedWaitStateElementTypeFilter"
sidebar_label: "AdvancedWaitStateElementTypeFilter"
mdx:
  format: md
---

# Type Alias: AdvancedWaitStateElementTypeFilter

```ts
type AdvancedWaitStateElementTypeFilter = object;
```

Advanced filter

Advanced element type filter.

## Properties

### $eq?

```ts
optional $eq?: WaitStateElementTypeEnum;
```

Checks for equality with the provided value.

---

### $exists?

```ts
optional $exists?: boolean;
```

Checks if the current property exists.

---

### $in?

```ts
optional $in?: WaitStateElementTypeEnum[];
```

Checks if the property matches any of the provided values.

---

### $like?

```ts
optional $like?: LikeFilter;
```

---

### $neq?

```ts
optional $neq?: WaitStateElementTypeEnum;
```

Checks for inequality with the provided value.
