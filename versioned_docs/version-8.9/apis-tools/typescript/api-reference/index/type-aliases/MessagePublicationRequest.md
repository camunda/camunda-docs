---
title: "Type Alias: MessagePublicationRequest"
sidebar_label: "MessagePublicationRequest"
mdx:
  format: md
---

# Type Alias: MessagePublicationRequest

```ts
type MessagePublicationRequest = object;
```

## Properties

### correlationKey?

```ts
optional correlationKey?: string;
```

The correlation key of the message.

---

### messageId?

```ts
optional messageId?: string;
```

The unique ID of the message. This is used to ensure only one message with the given ID
will be published during the lifetime of the message (if `timeToLive` is set).

---

### name

```ts
name: string;
```

The name of the message.

---

### tenantId?

```ts
optional tenantId?: TenantId;
```

The tenant of the message sender.

---

### timeToLive?

```ts
optional timeToLive?: number;
```

Timespan (in ms) to buffer the message on the broker.

---

### variables?

```ts
optional variables?: object;
```

The message variables as JSON document.

#### Index Signature

```ts
[key: string]: unknown
```
