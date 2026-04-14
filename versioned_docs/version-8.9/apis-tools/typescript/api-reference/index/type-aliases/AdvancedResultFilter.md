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
optional $eq?: AuditLogResultEnum;
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
optional $in?: AuditLogResultEnum[];
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
optional $neq?: AuditLogResultEnum;
```

Checks for inequality with the provided value.
