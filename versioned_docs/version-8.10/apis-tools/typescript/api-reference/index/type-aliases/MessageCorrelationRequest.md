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

### businessId?

```ts
optional businessId?: BusinessId;
```

An optional business id used to enforce uniqueness of the process instance that a
message start event would create. If provided and uniqueness enforcement is enabled,
the engine rejects starting a new process instance when another root process instance
with the same business id is already active for the same process definition. It has no
effect when the message correlates to a catch, boundary, or intermediate event.

---

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
