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
optional $eq?: WaitStateTypeEnum;
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
optional $in?: WaitStateTypeEnum[];
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
optional $neq?: WaitStateTypeEnum;
```

Checks for inequality with the provided value.
