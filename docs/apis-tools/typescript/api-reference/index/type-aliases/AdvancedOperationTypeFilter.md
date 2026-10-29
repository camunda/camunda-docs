---
title: "Type Alias: AdvancedOperationTypeFilter"
sidebar_label: "AdvancedOperationTypeFilter"
mdx:
  format: md
---

# Type Alias: AdvancedOperationTypeFilter

```ts
type AdvancedOperationTypeFilter = object;
```

Advanced filter

Advanced AuditLogOperationTypeEnum filter.

## Properties

### $eq?

```ts
$eq?: AuditLogOperationTypeEnum;
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
$in?: AuditLogOperationTypeEnum[];
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
$neq?: AuditLogOperationTypeEnum;
```

Checks for inequality with the provided value.
