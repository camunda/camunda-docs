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

Defined in: [gen/types.gen.ts:5299](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5299)

## Properties

### correlationKey?

```ts
optional correlationKey: string;
```

Defined in: [gen/types.gen.ts:5343](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5343)

The correlation key of the message subscription.

***

### elementId?

```ts
optional elementId: ElementId;
```

Defined in: [gen/types.gen.ts:5326](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5326)

The element ID associated with this message subscription.

***

### elementInstanceKey?

```ts
optional elementInstanceKey: ElementInstanceKey;
```

Defined in: [gen/types.gen.ts:5330](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5330)

The element instance key associated with this message subscription.

***

### lastUpdatedDate?

```ts
optional lastUpdatedDate: string;
```

Defined in: [gen/types.gen.ts:5335](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5335)

The last updated date of the message subscription.

***

### messageName?

```ts
optional messageName: string;
```

Defined in: [gen/types.gen.ts:5339](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5339)

The name of the message associated with the message subscription.

***

### messageSubscriptionKey?

```ts
optional messageSubscriptionKey: MessageSubscriptionKey;
```

Defined in: [gen/types.gen.ts:5303](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5303)

The message subscription key associated with this message subscription.

***

### messageSubscriptionState?

```ts
optional messageSubscriptionState: MessageSubscriptionStateEnum;
```

Defined in: [gen/types.gen.ts:5331](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5331)

***

### processDefinitionId?

```ts
optional processDefinitionId: ProcessDefinitionId;
```

Defined in: [gen/types.gen.ts:5307](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5307)

The process definition ID associated with this message subscription.

***

### processDefinitionKey?

```ts
optional processDefinitionKey: ProcessDefinitionKey;
```

Defined in: [gen/types.gen.ts:5311](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5311)

The process definition key associated with this message subscription.

***

### processInstanceKey?

```ts
optional processInstanceKey: ProcessInstanceKey;
```

Defined in: [gen/types.gen.ts:5315](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5315)

The process instance key associated with this message subscription.

***

### rootProcessInstanceKey

```ts
rootProcessInstanceKey: ProcessInstanceKey | null;
```

Defined in: [gen/types.gen.ts:5322](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5322)

The key of the root process instance. The root process instance is the top-level
ancestor in the process instance hierarchy. This field is only present for data
belonging to process instance hierarchies created in version 8.9 or later.

***

### tenantId?

```ts
optional tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:5344](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5344)
