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
optional $eq?: JobStateEnum;
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
optional $in?: JobStateEnum[];
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
optional $neq?: JobStateEnum;
```

Checks for inequality with the provided value.
