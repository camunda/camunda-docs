---
title: "Type Alias: SignalBroadcastRequest"
sidebar_label: "SignalBroadcastRequest"
mdx:
  format: md
---

# Type Alias: SignalBroadcastRequest

```ts
type SignalBroadcastRequest = object;
```

## Properties

### signalName

```ts
signalName: string;
```

The name of the signal to broadcast.

---

### tenantId?

```ts
tenantId?: TenantId;
```

The ID of the tenant that owns the signal.

---

### variables?

```ts
variables?: object;
```

The signal variables as a JSON object.

#### Index Signature

```ts
[key: string]: unknown
```
