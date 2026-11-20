---
title: "Type Alias: AdvancedBatchOperationStateFilter"
sidebar_label: "AdvancedBatchOperationStateFilter"
mdx:
  format: md
---

# Type Alias: AdvancedBatchOperationStateFilter

```ts
type AdvancedBatchOperationStateFilter = object;
```

Advanced filter

Advanced BatchOperationStateEnum filter.

## Properties

### $eq?

```ts
optional $eq?: BatchOperationStateEnum;
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
optional $in?: BatchOperationStateEnum[];
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
optional $neq?: BatchOperationStateEnum;
```

Checks for inequality with the provided value.
