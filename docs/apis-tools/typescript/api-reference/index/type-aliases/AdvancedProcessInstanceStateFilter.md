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
optional $eq?: ProcessInstanceStateEnum;
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
optional $in?: ProcessInstanceStateEnum[];
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
optional $neq?: ProcessInstanceStateEnum;
```

Checks for inequality with the provided value.
