---
title: "Type Alias: CorrelatedMessageSubscriptionResult"
sidebar_label: "CorrelatedMessageSubscriptionResult"
mdx:
  format: md
---

# Type Alias: CorrelatedMessageSubscriptionResult

```ts
type CorrelatedMessageSubscriptionResult = object;
```

## Properties

### correlationKey

```ts
correlationKey: string | null;
```

The correlation key of the message.

---

### correlationTime

```ts
correlationTime: string;
```

The time when the message was correlated.

---

### elementId

```ts
elementId: string;
```

The element ID that received the message.

---

### elementInstanceKey

```ts
elementInstanceKey: ElementInstanceKey | null;
```

The element instance key that received the message.
It is `null` for start event subscriptions.

---

### messageKey

```ts
messageKey: MessageKey;
```

The message key.

---

### messageName

```ts
messageName: string;
```

The name of the message.

---

### partitionId

```ts
partitionId: number;
```

The partition ID that correlated the message.

---

### processDefinitionId

```ts
processDefinitionId: ProcessDefinitionId;
```

The process definition ID associated with this correlated message subscription.

---

### processDefinitionKey

```ts
processDefinitionKey: ProcessDefinitionKey;
```

The process definition key associated with this correlated message subscription.

---

### processInstanceKey

```ts
processInstanceKey: ProcessInstanceKey;
```

The process instance key associated with this correlated message subscription.

---

### rootProcessInstanceKey

```ts
rootProcessInstanceKey: ProcessInstanceKey | null;
```

The key of the root process instance. The root process instance is the top-level
ancestor in the process instance hierarchy. This field is only present for data
belonging to process instance hierarchies created in version 8.9 or later.

---

### subscriptionKey

```ts
subscriptionKey: MessageSubscriptionKey;
```

The subscription key that received the message.

---

### tenantId

```ts
tenantId: TenantId;
```

The tenant ID associated with this correlated message subscription.
