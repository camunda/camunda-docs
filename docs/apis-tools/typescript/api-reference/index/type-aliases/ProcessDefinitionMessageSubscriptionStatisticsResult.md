---
title: "Type Alias: ProcessDefinitionMessageSubscriptionStatisticsResult"
sidebar_label: "ProcessDefinitionMessageSubscriptionStatisticsResult"
mdx:
  format: md
---

# Type Alias: ProcessDefinitionMessageSubscriptionStatisticsResult

```ts
type ProcessDefinitionMessageSubscriptionStatisticsResult = object;
```

Defined in: [gen/types.gen.ts:5829](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5829)

## Properties

### activeSubscriptions?

```ts
optional activeSubscriptions: number;
```

Defined in: [gen/types.gen.ts:5849](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5849)

The total number of active message subscriptions for this process definition key.

***

### processDefinitionId?

```ts
optional processDefinitionId: ProcessDefinitionId;
```

Defined in: [gen/types.gen.ts:5833](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5833)

The process definition ID associated with this message subscription.

***

### processDefinitionKey?

```ts
optional processDefinitionKey: ProcessDefinitionKey;
```

Defined in: [gen/types.gen.ts:5841](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5841)

The process definition key associated with this message subscription.

***

### processInstancesWithActiveSubscriptions?

```ts
optional processInstancesWithActiveSubscriptions: number;
```

Defined in: [gen/types.gen.ts:5845](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5845)

The number of process instances with active message subscriptions.

***

### tenantId?

```ts
optional tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:5837](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5837)

The tenant ID associated with this message subscription.
