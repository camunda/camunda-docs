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
optional $eq?: AuditLogOperationTypeEnum;
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
optional $in?: AuditLogOperationTypeEnum[];
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
optional $neq?: AuditLogOperationTypeEnum;
```

Checks for inequality with the provided value.
