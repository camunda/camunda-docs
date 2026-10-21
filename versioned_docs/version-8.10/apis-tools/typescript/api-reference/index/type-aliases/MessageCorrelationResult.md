---
title: "Type Alias: MessageCorrelationResult"
sidebar_label: "MessageCorrelationResult"
mdx:
  format: md
---

# Type Alias: MessageCorrelationResult

```ts
type MessageCorrelationResult = object;
```

The message key of the correlated message, as well as the first process instance key it
correlated with.

## Properties

### messageKey

```ts
messageKey: MessageKey;
```

The key of the correlated message.

---

### processInstanceKey

```ts
processInstanceKey: ProcessInstanceKey;
```

The key of the first process instance the message correlated with

---

### tenantId

```ts
tenantId: TenantId;
```

The tenant ID of the correlated message
