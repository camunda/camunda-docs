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

### businessId?

```ts
businessId?: StringFilterProperty;
```

Filter by the business id inherited from the subscribing process instance when the
subscription was opened. Supports advanced string filtering, including `$like` with
`*`/`?` wildcards.

---

### correlationKey?

```ts
correlationKey?: StringFilterProperty;
```

The correlation key of the message subscription.

---

### elementId?

```ts
elementId?: StringFilterProperty;
```

The element ID associated with this message subscription.

---

### elementInstanceKey?

```ts
elementInstanceKey?: ElementInstanceKeyFilterProperty;
```

The element instance key associated with this message subscription.

---

### inboundConnectorType?

```ts
inboundConnectorType?: StringFilterProperty;
```

Filter by inbound connector type extracted from the `inbound.type` zeebe:property.

---

### lastUpdatedDate?

```ts
lastUpdatedDate?: DateTimeFilterProperty;
```

The last updated date of the message subscription.

---

### messageName?

```ts
messageName?: StringFilterProperty;
```

The name of the message associated with the message subscription.

---

### messageSubscriptionKey?

```ts
messageSubscriptionKey?: MessageSubscriptionKeyFilterProperty;
```

The message subscription key associated with this message subscription.

---

### messageSubscriptionState?

```ts
messageSubscriptionState?: MessageSubscriptionStateFilterProperty;
```

The message subscription state.

---

### messageSubscriptionType?

```ts
messageSubscriptionType?: MessageSubscriptionTypeFilterProperty;
```

The type of message subscription to filter by. When omitted, both
`START_EVENT` and `PROCESS_EVENT` are returned. Only available for data
created with Camunda 8.10 or later.

---

### processDefinitionId?

```ts
processDefinitionId?: StringFilterProperty;
```

The process definition ID associated with this message subscription.

---

### processDefinitionKey?

```ts
processDefinitionKey?: ProcessDefinitionKeyFilterProperty;
```

The process definition key associated with this correlated message subscription. This only works for data created with 8.9 and later.

---

### processDefinitionName?

```ts
processDefinitionName?: StringFilterProperty;
```

The name of the process definition associated with this message subscription.

---

### processDefinitionVersion?

```ts
processDefinitionVersion?: IntegerFilterProperty;
```

The version of the process definition associated with this message subscription.

---

### processInstanceKey?

```ts
processInstanceKey?: ProcessInstanceKeyFilterProperty;
```

The process instance key associated with this message subscription.

---

### tenantId?

```ts
tenantId?: StringFilterProperty;
```

The unique external tenant ID.

---

### toolName?

```ts
toolName?: StringFilterProperty;
```

Filter by tool name extracted from the `io.camunda.tool:name` zeebe:property.
