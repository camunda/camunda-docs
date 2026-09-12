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
optional $eq?: AuditLogCategoryEnum;
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
optional $in?: AuditLogCategoryEnum[];
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
optional $neq?: AuditLogCategoryEnum;
```

Checks for inequality with the provided value.
