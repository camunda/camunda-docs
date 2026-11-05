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

### businessId?

```ts
businessId?: StringFilterProperty;
```

Filter by the business id stored on the correlated message subscription — for message
start event correlations the correlating message's business id, and for catch, boundary,
or intermediate event correlations the subscribing process instance's business id.
Supports advanced string filtering, including `$like` with `*`/`?` wildcards.

---

### correlationKey?

```ts
correlationKey?: StringFilterProperty;
```

The correlation key of the message.

---

### correlationTime?

```ts
correlationTime?: DateTimeFilterProperty;
```

The time when the message was correlated.

---

### elementId?

```ts
elementId?: StringFilterProperty;
```

The element ID that received the message.

---

### elementInstanceKey?

```ts
elementInstanceKey?: ElementInstanceKeyFilterProperty;
```

The element instance key that received the message.

---

### messageKey?

```ts
messageKey?: BasicStringFilterProperty;
```

The message key.

---

### messageName?

```ts
messageName?: StringFilterProperty;
```

The name of the message.

---

### partitionId?

```ts
partitionId?: IntegerFilterProperty;
```

The partition ID that correlated the message.

---

### processDefinitionId?

```ts
processDefinitionId?: StringFilterProperty;
```

The process definition ID associated with this correlated message subscription.

---

### processDefinitionKey?

```ts
processDefinitionKey?: ProcessDefinitionKeyFilterProperty;
```

The process definition key associated with this correlated message subscription. For intermediate message events, this only works for data created with 8.9 and later.

---

### processInstanceKey?

```ts
processInstanceKey?: ProcessInstanceKeyFilterProperty;
```

The process instance key associated with this correlated message subscription.

---

### subscriptionKey?

```ts
subscriptionKey?: MessageSubscriptionKeyFilterProperty;
```

The subscription key that received the message.

---

### tenantId?

```ts
tenantId?: StringFilterProperty;
```

The tenant ID associated with this correlated message subscription.
