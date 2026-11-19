---
title: "Type Alias: AdvancedJobStateFilter"
sidebar_label: "AdvancedJobStateFilter"
mdx:
  format: md
---

# Type Alias: AdvancedJobStateFilter

```ts
type AdvancedJobStateFilter = object;
```

Advanced filter

Advanced JobStateEnum filter.

## Properties

### $eq?

```ts
$eq?: JobStateEnum;
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
$in?: JobStateEnum[];
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
$neq?: JobStateEnum;
```

Checks for inequality with the provided value.
