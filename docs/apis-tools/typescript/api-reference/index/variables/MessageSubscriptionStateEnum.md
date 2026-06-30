---
title: "Variable: MessageSubscriptionStateEnum"
sidebar_label: "MessageSubscriptionStateEnum"
mdx:
  format: md
---

# Variable: MessageSubscriptionStateEnum

```ts
const MessageSubscriptionStateEnum: object;
```

The state of message subscription.

**Note for `START_EVENT` subscriptions:** The `CORRELATED` and `MIGRATED` states are not
tracked for these subscriptions. To query correlation history for process start events,
use the `/correlated-message-subscriptions/search` endpoint.

## Type Declaration

### CORRELATED

```ts
readonly CORRELATED: "CORRELATED" = 'CORRELATED';
```

### CREATED

```ts
readonly CREATED: "CREATED" = 'CREATED';
```

### DELETED

```ts
readonly DELETED: "DELETED" = 'DELETED';
```

### MIGRATED

```ts
readonly MIGRATED: "MIGRATED" = 'MIGRATED';
```
