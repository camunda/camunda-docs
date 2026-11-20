---
title: "Type Alias: AdvancedWaitStateTypeFilter"
sidebar_label: "AdvancedWaitStateTypeFilter"
mdx:
  format: md
---

# Type Alias: AdvancedWaitStateTypeFilter

```ts
type AdvancedWaitStateTypeFilter = object;
```

Advanced filter

Advanced wait state type filter.

## Properties

### $eq?

```ts
$eq?: WaitStateTypeEnum;
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
$in?: WaitStateTypeEnum[];
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
$neq?: WaitStateTypeEnum;
```

Checks for inequality with the provided value.
