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

Defined in: [gen/types.gen.ts:5900](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5900)

## Properties

### activeSubscriptions

```ts
activeSubscriptions: number;
```

Defined in: [gen/types.gen.ts:5920](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5920)

The total number of active message subscriptions for this process definition key.

***

### processDefinitionId

```ts
processDefinitionId: ProcessDefinitionId;
```

Defined in: [gen/types.gen.ts:5904](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5904)

The process definition ID associated with this message subscription.

***

### processDefinitionKey

```ts
processDefinitionKey: ProcessDefinitionKey;
```

Defined in: [gen/types.gen.ts:5912](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5912)

The process definition key associated with this message subscription.

***

### processInstancesWithActiveSubscriptions

```ts
processInstancesWithActiveSubscriptions: number;
```

Defined in: [gen/types.gen.ts:5916](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5916)

The number of process instances with active message subscriptions.

***

### tenantId

```ts
tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:5908](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5908)

The tenant ID associated with this message subscription.
