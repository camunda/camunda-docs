---
title: "Type Alias: AdvancedElementInstanceStateFilter"
sidebar_label: "AdvancedElementInstanceStateFilter"
mdx:
  format: md
---

# Type Alias: AdvancedElementInstanceStateFilter

```ts
type AdvancedElementInstanceStateFilter = object;
```

Advanced filter

Advanced ElementInstanceStateEnum filter.

## Properties

### $eq?

```ts
optional $eq?: ElementInstanceStateEnum;
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
optional $in?: ElementInstanceStateEnum[];
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
optional $neq?: ElementInstanceStateEnum;
```

Checks for inequality with the provided value.
