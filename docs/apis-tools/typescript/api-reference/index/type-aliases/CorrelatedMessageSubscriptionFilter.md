---
title: "Type Alias: CorrelatedMessageSubscriptionFilter"
sidebar_label: "CorrelatedMessageSubscriptionFilter"
mdx:
  format: md
---

# Type Alias: CorrelatedMessageSubscriptionFilter

```ts
type CorrelatedMessageSubscriptionFilter = object;
```

Correlated message subscriptions search filter.

## Properties

### correlationKey?

```ts
optional correlationKey?: StringFilterProperty;
```

The correlation key of the message.

---

### correlationTime?

```ts
optional correlationTime?: DateTimeFilterProperty;
```

The time when the message was correlated.

---

### elementId?

```ts
optional elementId?: StringFilterProperty;
```

The element ID that received the message.

---

### elementInstanceKey?

```ts
optional elementInstanceKey?: ElementInstanceKeyFilterProperty;
```

The element instance key that received the message.

---

### messageKey?

```ts
optional messageKey?: BasicStringFilterProperty;
```

The message key.

---

### messageName?

```ts
optional messageName?: StringFilterProperty;
```

The name of the message.

---

### partitionId?

```ts
optional partitionId?: IntegerFilterProperty;
```

The partition ID that correlated the message.

---

### processDefinitionId?

```ts
optional processDefinitionId?: StringFilterProperty;
```

The process definition ID associated with this correlated message subscription.

---

### processDefinitionKey?

```ts
optional processDefinitionKey?: ProcessDefinitionKeyFilterProperty;
```

The process definition key associated with this correlated message subscription. For intermediate message events, this only works for data created with 8.9 and later.

---

### processInstanceKey?

```ts
optional processInstanceKey?: ProcessInstanceKeyFilterProperty;
```

The process instance key associated with this correlated message subscription.

---

### subscriptionKey?

```ts
optional subscriptionKey?: MessageSubscriptionKeyFilterProperty;
```

The subscription key that received the message.

---

### tenantId?

```ts
optional tenantId?: StringFilterProperty;
```

The tenant ID associated with this correlated message subscription.
