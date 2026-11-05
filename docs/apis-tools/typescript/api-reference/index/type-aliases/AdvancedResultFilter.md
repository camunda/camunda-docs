---
title: "Type Alias: AdvancedResultFilter"
sidebar_label: "AdvancedResultFilter"
mdx:
  format: md
---

# Type Alias: AdvancedResultFilter

```ts
type AdvancedResultFilter = object;
```

Advanced filter

Advanced AuditLogResultEnum filter.

## Properties

### $eq?

```ts
$eq?: AuditLogResultEnum;
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
$in?: AuditLogResultEnum[];
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
$neq?: AuditLogResultEnum;
```

Checks for inequality with the provided value.
