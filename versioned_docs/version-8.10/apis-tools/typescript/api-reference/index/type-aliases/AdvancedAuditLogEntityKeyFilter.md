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
optional $eq?: AuditLogEntityKey;
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
optional $in?: AuditLogEntityKey[];
```

Checks if the property matches any of the provided values.

---

### $neq?

```ts
optional $neq?: AuditLogEntityKey;
```

Checks for inequality with the provided value.

---

### $notIn?

```ts
optional $notIn?: AuditLogEntityKey[];
```

Checks if the property matches none of the provided values.
