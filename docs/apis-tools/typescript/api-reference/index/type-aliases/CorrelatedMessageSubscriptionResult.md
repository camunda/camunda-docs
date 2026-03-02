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

Defined in: [gen/types.gen.ts:4847](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L4847)

## Properties

### correlationKey

```ts
correlationKey: string;
```

Defined in: [gen/types.gen.ts:4851](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L4851)

The correlation key of the message.

---

### correlationTime

```ts
correlationTime: string;
```

Defined in: [gen/types.gen.ts:4855](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L4855)

The time when the message was correlated.

---

### elementId

```ts
elementId: string;
```

Defined in: [gen/types.gen.ts:4859](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L4859)

The element ID that received the message.

---

### elementInstanceKey?

```ts
optional elementInstanceKey: ElementInstanceKey;
```

Defined in: [gen/types.gen.ts:4863](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L4863)

The element instance key that received the message.

---

### messageKey

```ts
messageKey: MessageKey;
```

Defined in: [gen/types.gen.ts:4867](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L4867)

The message key.

---

### messageName

```ts
messageName: string;
```

Defined in: [gen/types.gen.ts:4871](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L4871)

The name of the message.

---

### partitionId

```ts
partitionId: number;
```

Defined in: [gen/types.gen.ts:4875](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L4875)

The partition ID that correlated the message.

---

### processDefinitionId

```ts
processDefinitionId: ProcessDefinitionId;
```

Defined in: [gen/types.gen.ts:4879](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L4879)

The process definition ID associated with this correlated message subscription.

---

### processDefinitionKey?

```ts
optional processDefinitionKey: ProcessDefinitionKey;
```

Defined in: [gen/types.gen.ts:4883](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L4883)

The process definition key associated with this correlated message subscription.

---

### processInstanceKey

```ts
processInstanceKey: ProcessInstanceKey;
```

Defined in: [gen/types.gen.ts:4887](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L4887)

The process instance key associated with this correlated message subscription.

---

### rootProcessInstanceKey?

```ts
optional rootProcessInstanceKey: RootProcessInstanceKey;
```

Defined in: [gen/types.gen.ts:4888](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L4888)

---

### subscriptionKey

```ts
subscriptionKey: MessageSubscriptionKey;
```

Defined in: [gen/types.gen.ts:4892](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L4892)

The subscription key that received the message.

---

### tenantId

```ts
tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:4896](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L4896)

The tenant ID associated with this correlated message subscription.
