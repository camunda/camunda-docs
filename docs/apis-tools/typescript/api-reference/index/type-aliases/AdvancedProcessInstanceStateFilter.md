---
title: "Type Alias: AdvancedProcessInstanceStateFilter"
sidebar_label: "AdvancedProcessInstanceStateFilter"
mdx:
  format: md
---

# Type Alias: AdvancedProcessInstanceStateFilter

```ts
type AdvancedProcessInstanceStateFilter = object;
```

Advanced filter

Advanced ProcessInstanceStateEnum filter.

## Properties

### $eq?

```ts
$eq?: ProcessInstanceStateEnum;
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
$in?: ProcessInstanceStateEnum[];
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
$neq?: ProcessInstanceStateEnum;
```

Checks for inequality with the provided value.
