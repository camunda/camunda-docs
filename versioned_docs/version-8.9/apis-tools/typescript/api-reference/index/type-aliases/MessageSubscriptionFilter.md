---
title: "Type Alias: MessageSubscriptionFilter"
sidebar_label: "MessageSubscriptionFilter"
mdx:
  format: md
---

# Type Alias: MessageSubscriptionFilter

```ts
type MessageSubscriptionFilter = object;
```

Message subscription search filter.

## Properties

### correlationKey?

```ts
optional correlationKey?: StringFilterProperty;
```

The correlation key of the message subscription.

---

### elementId?

```ts
optional elementId?: StringFilterProperty;
```

The element ID associated with this message subscription.

---

### elementInstanceKey?

```ts
optional elementInstanceKey?: ElementInstanceKeyFilterProperty;
```

The element instance key associated with this message subscription.

---

### lastUpdatedDate?

```ts
optional lastUpdatedDate?: DateTimeFilterProperty;
```

The last updated date of the message subscription.

---

### messageName?

```ts
optional messageName?: StringFilterProperty;
```

The name of the message associated with the message subscription.

---

### messageSubscriptionKey?

```ts
optional messageSubscriptionKey?: MessageSubscriptionKeyFilterProperty;
```

The message subscription key associated with this message subscription.

---

### messageSubscriptionState?

```ts
optional messageSubscriptionState?: MessageSubscriptionStateFilterProperty;
```

The message subscription state.

---

### processDefinitionId?

```ts
optional processDefinitionId?: StringFilterProperty;
```

The process definition ID associated with this message subscription.

---

### processDefinitionKey?

```ts
optional processDefinitionKey?: ProcessDefinitionKeyFilterProperty;
```

The process definition key associated with this correlated message subscription. This only works for data created with 8.9 and later.

---

### processInstanceKey?

```ts
optional processInstanceKey?: ProcessInstanceKeyFilterProperty;
```

The process instance key associated with this message subscription.

---

### tenantId?

```ts
optional tenantId?: StringFilterProperty;
```

The unique external tenant ID.
