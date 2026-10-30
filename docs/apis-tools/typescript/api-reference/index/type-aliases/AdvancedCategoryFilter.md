---
title: "Type Alias: AdvancedCategoryFilter"
sidebar_label: "AdvancedCategoryFilter"
mdx:
  format: md
---

# Type Alias: AdvancedCategoryFilter

```ts
type AdvancedCategoryFilter = object;
```

Advanced filter

Advanced AuditLogCategoryEnum filter.

## Properties

### $eq?

```ts
$eq?: AuditLogCategoryEnum;
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
$in?: AuditLogCategoryEnum[];
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
$neq?: AuditLogCategoryEnum;
```

Checks for inequality with the provided value.
