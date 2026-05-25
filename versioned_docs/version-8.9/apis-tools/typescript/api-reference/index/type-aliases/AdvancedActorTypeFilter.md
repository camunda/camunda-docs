---
title: "Type Alias: AdvancedActorTypeFilter"
sidebar_label: "AdvancedActorTypeFilter"
mdx:
  format: md
---

# Type Alias: AdvancedActorTypeFilter

```ts
type AdvancedActorTypeFilter = object;
```

Advanced filter

Advanced AuditLogActorTypeEnum filter.

## Properties

### $eq?

```ts
optional $eq?: AuditLogActorTypeEnum;
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
optional $in?: AuditLogActorTypeEnum[];
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
optional $neq?: AuditLogActorTypeEnum;
```

Checks for inequality with the provided value.
