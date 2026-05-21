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

### inboundConnectorType?

```ts
optional inboundConnectorType?: StringFilterProperty;
```

Filter by inbound connector type extracted from the `inbound.type` zeebe:property.

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

### messageSubscriptionType?

```ts
optional messageSubscriptionType?: MessageSubscriptionTypeFilterProperty;
```

The type of message subscription to filter by. When omitted, both
`START_EVENT` and `PROCESS_EVENT` are returned. Only available for data
created with Camunda 8.10 or later.

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

### processDefinitionName?

```ts
optional processDefinitionName?: StringFilterProperty;
```

The name of the process definition associated with this message subscription.

---

### processDefinitionVersion?

```ts
optional processDefinitionVersion?: IntegerFilterProperty;
```

The version of the process definition associated with this message subscription.

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

---

### toolName?

```ts
optional toolName?: StringFilterProperty;
```

Filter by tool name extracted from the `io.camunda.tool:name` zeebe:property.
