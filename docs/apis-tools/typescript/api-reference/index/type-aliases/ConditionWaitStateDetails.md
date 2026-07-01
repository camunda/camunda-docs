---
title: "Type Alias: ConditionWaitStateDetails"
sidebar_label: "ConditionWaitStateDetails"
mdx:
  format: md
---

# Type Alias: ConditionWaitStateDetails

```ts
type ConditionWaitStateDetails = BaseWaitStateDetails & object;
```

## Type Declaration

### events

```ts
events: ("create" | "update")[];
```

The variable events that trigger condition re-evaluation. Empty means all events.

### expression

```ts
expression: string;
```

The condition expression that must evaluate to true to proceed.

### waitStateType

```ts
waitStateType: string;
```

The wait state type discriminator.
