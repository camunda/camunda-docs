---
title: "Type Alias: MessageSubscriptionResult"
sidebar_label: "MessageSubscriptionResult"
mdx:
  format: md
---

# Type Alias: MessageSubscriptionResult

```ts
type MessageSubscriptionResult = object;
```

## Properties

### correlationKey

```ts
correlationKey: string | null;
```

The correlation key of the message subscription.

---

### elementId

```ts
elementId: ElementId;
```

The element ID associated with this message subscription.

---

### elementInstanceKey

```ts
elementInstanceKey: ElementInstanceKey | null;
```

The element instance key associated with this message subscription.

---

### lastUpdatedDate

```ts
lastUpdatedDate: string;
```

The last updated date of the message subscription.

---

### messageName

```ts
messageName: string;
```

The name of the message associated with the message subscription.

---

### messageSubscriptionKey

```ts
messageSubscriptionKey: MessageSubscriptionKey;
```

The message subscription key associated with this message subscription.

---

### messageSubscriptionState

```ts
messageSubscriptionState: MessageSubscriptionStateEnum;
```

---

### processDefinitionId

```ts
processDefinitionId: ProcessDefinitionId;
```

The process definition ID associated with this message subscription.

---

### processDefinitionKey

```ts
processDefinitionKey: ProcessDefinitionKey | null;
```

The process definition key associated with this message subscription.

---

### processInstanceKey

```ts
processInstanceKey: ProcessInstanceKey | null;
```

The process instance key associated with this message subscription.

---

### rootProcessInstanceKey

```ts
rootProcessInstanceKey: ProcessInstanceKey | null;
```

The key of the root process instance. The root process instance is the top-level
ancestor in the process instance hierarchy. This field is only present for data
belonging to process instance hierarchies created in version 8.9 or later.

---

### tenantId

```ts
tenantId: TenantId;
```
