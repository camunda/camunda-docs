---
title: "Type Alias: AdvancedBatchOperationItemStateFilter"
sidebar_label: "AdvancedBatchOperationItemStateFilter"
mdx:
  format: md
---

# Type Alias: AdvancedBatchOperationItemStateFilter

```ts
type AdvancedBatchOperationItemStateFilter = object;
```

Advanced filter

Advanced BatchOperationItemStateEnum filter.

## Properties

### $eq?

```ts
optional $eq?: BatchOperationItemStateEnum;
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
optional $in?: BatchOperationItemStateEnum[];
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
optional $neq?: BatchOperationItemStateEnum;
```

Checks for inequality with the provided value.
