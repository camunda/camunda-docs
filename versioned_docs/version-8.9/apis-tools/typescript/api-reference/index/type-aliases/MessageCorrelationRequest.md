---
title: "Type Alias: MessageCorrelationRequest"
sidebar_label: "MessageCorrelationRequest"
mdx:
  format: md
---

# Type Alias: MessageCorrelationRequest

```ts
type MessageCorrelationRequest = object;
```

## Properties

### correlationKey?

```ts
optional correlationKey?: string;
```

The correlation key of the message.

---

### name

```ts
name: string;
```

The message name as defined in the BPMN process

---

### tenantId?

```ts
optional tenantId?: TenantId;
```

the tenant for which the message is published

---

### variables?

```ts
optional variables?: object;
```

The message variables as JSON document

#### Index Signature

```ts
[key: string]: unknown
```
