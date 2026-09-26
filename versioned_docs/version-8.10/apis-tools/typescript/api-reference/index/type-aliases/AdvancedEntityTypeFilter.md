---
title: "Type Alias: AdvancedEntityTypeFilter"
sidebar_label: "AdvancedEntityTypeFilter"
mdx:
  format: md
---

# Type Alias: AdvancedEntityTypeFilter

```ts
type AdvancedEntityTypeFilter = object;
```

Advanced filter

Advanced AuditLogEntityTypeEnum filter.

## Properties

### $eq?

```ts
optional $eq?: AuditLogEntityTypeEnum;
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
optional $in?: AuditLogEntityTypeEnum[];
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
optional $neq?: AuditLogEntityTypeEnum;
```

Checks for inequality with the provided value.
