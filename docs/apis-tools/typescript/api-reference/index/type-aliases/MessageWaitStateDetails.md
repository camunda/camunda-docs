---
title: "Type Alias: MessageWaitStateDetails"
sidebar_label: "MessageWaitStateDetails"
mdx:
  format: md
---

# Type Alias: MessageWaitStateDetails

```ts
type MessageWaitStateDetails = object;
```

## Properties

### correlationKey

```ts
correlationKey: string | null;
```

The correlation key for the message subscription (null for start events).

---

### messageName

```ts
messageName: string;
```

The name of the message being awaited.
