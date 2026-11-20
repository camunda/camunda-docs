---
title: "Type Alias: AdvancedJobKindFilter"
sidebar_label: "AdvancedJobKindFilter"
mdx:
  format: md
---

# Type Alias: AdvancedJobKindFilter

```ts
type AdvancedJobKindFilter = object;
```

Advanced filter

Advanced JobKindEnum filter.

## Properties

### $eq?

```ts
optional $eq?: JobKindEnum;
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
optional $in?: JobKindEnum[];
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
optional $neq?: JobKindEnum;
```

Checks for inequality with the provided value.
