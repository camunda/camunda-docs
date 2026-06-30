---
title: "Type Alias: MessageSubscriptionStateEnum"
sidebar_label: "MessageSubscriptionStateEnum"
mdx:
  format: md
---

# Type Alias: MessageSubscriptionStateEnum

```ts
type MessageSubscriptionStateEnum =
  (typeof MessageSubscriptionStateEnum)[keyof typeof MessageSubscriptionStateEnum];
```

The state of message subscription.

**Note for `START_EVENT` subscriptions:** The `CORRELATED` and `MIGRATED` states are not
tracked for these subscriptions. To query correlation history for process start events,
use the `/correlated-message-subscriptions/search` endpoint.
