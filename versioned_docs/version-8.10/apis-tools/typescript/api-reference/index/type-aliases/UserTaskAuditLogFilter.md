---
title: "Type Alias: UserTaskAuditLogFilter"
sidebar_label: "UserTaskAuditLogFilter"
mdx:
  format: md
---

# Type Alias: UserTaskAuditLogFilter

```ts
type UserTaskAuditLogFilter = object;
```

The user task audit log search filters.

## Properties

### actorId?

```ts
optional actorId?: StringFilterProperty;
```

The actor ID search filter.

---

### actorType?

```ts
optional actorType?: AuditLogActorTypeFilterProperty;
```

The actor type search filter.

---

### operationType?

```ts
optional operationType?: OperationTypeFilterProperty;
```

The audit log operation type search filter.

---

### result?

```ts
optional result?: AuditLogResultFilterProperty;
```

The audit log result search filter.

---

### timestamp?

```ts
optional timestamp?: DateTimeFilterProperty;
```

The audit log timestamp filter.
