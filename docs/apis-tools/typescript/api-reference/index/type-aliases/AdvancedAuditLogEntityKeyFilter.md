---
title: "Type Alias: AdvancedAuditLogEntityKeyFilter"
sidebar_label: "AdvancedAuditLogEntityKeyFilter"
mdx:
  format: md
---

# Type Alias: AdvancedAuditLogEntityKeyFilter

```ts
type AdvancedAuditLogEntityKeyFilter = object;
```

Advanced filter

Advanced entityKey filter.

## Properties

### $eq?

```ts
$eq?: AuditLogEntityKey;
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
$in?: AuditLogEntityKey[];
```

Checks if the property matches any of the provided values.

---

### $neq?

```ts
$neq?: AuditLogEntityKey;
```

Checks for inequality with the provided value.

---

### $notIn?

```ts
$notIn?: AuditLogEntityKey[];
```

Checks if the property matches none of the provided values.
