---
title: "Type Alias: AdvancedAuditLogKeyFilter"
sidebar_label: "AdvancedAuditLogKeyFilter"
mdx:
  format: md
---

# Type Alias: AdvancedAuditLogKeyFilter

```ts
type AdvancedAuditLogKeyFilter = object;
```

Advanced filter

Advanced AuditLogKey filter.

## Properties

### $eq?

```ts
optional $eq?: AuditLogKey;
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
optional $in?: AuditLogKey[];
```

Checks if the property matches any of the provided values.

---

### $neq?

```ts
optional $neq?: AuditLogKey;
```

Checks for inequality with the provided value.

---

### $notIn?

```ts
optional $notIn?: AuditLogKey[];
```

Checks if the property matches none of the provided values.
