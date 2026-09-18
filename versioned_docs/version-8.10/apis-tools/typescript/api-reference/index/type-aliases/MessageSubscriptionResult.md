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
Only populated for intermediate event entities.

---

### inboundConnectorType

```ts
inboundConnectorType: string | null;
```

Inbound connector type extracted from the `inbound.type` zeebe:property.
Null when the property is absent.

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

### messageSubscriptionType

```ts
messageSubscriptionType: MessageSubscriptionTypeEnum;
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

### processDefinitionName

```ts
processDefinitionName: string | null;
```

The name of the process definition associated with this message subscription.

---

### processDefinitionVersion

```ts
processDefinitionVersion: number | null;
```

The version of the process definition associated with this message subscription.

---

### processInstanceKey

```ts
processInstanceKey: ProcessInstanceKey | null;
```

The process instance key associated with this message subscription.
Only populated for intermediate event entities.

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

---

### toolName

```ts
toolName: string | null;
```

Tool name extracted from the `io.camunda.tool:name` zeebe:property.
Null when the property is absent.

---

### toolProperties

```ts
toolProperties: object;
```

The subset of `zeebe:properties` extension properties whose keys start with the
`io.camunda.tool:` prefix, extracted from the BPMN element associated with this
subscription. Empty object when no matching properties are defined.

#### Index Signature

```ts
[key: string]: string
```
