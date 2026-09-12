---
title: "Variable: MessageSubscriptionTypeEnum"
sidebar_label: "MessageSubscriptionTypeEnum"
mdx:
  format: md
---

# Variable: MessageSubscriptionTypeEnum

```ts
const MessageSubscriptionTypeEnum: object;
```

The type of message subscription.
`START_EVENT` is definition-scoped (process start events). Always has a value; only
captured from Camunda 8.10 onwards.
`PROCESS_EVENT` is instance-scoped (intermediate catch events). Pre-8.10 entries have
no value stored; the API returns `PROCESS_EVENT` as a default for those entries.

## Type Declaration

### PROCESS_EVENT

```ts
readonly PROCESS_EVENT: "PROCESS_EVENT" = 'PROCESS_EVENT';
```

### START_EVENT

```ts
readonly START_EVENT: "START_EVENT" = 'START_EVENT';
```
