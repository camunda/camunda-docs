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

Defined in: [gen/types.gen.ts:5903](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5903)

## Properties

### activeSubscriptions

```ts
activeSubscriptions: number;
```

Defined in: [gen/types.gen.ts:5923](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5923)

The total number of active message subscriptions for this process definition key.

---

### processDefinitionId

```ts
processDefinitionId: ProcessDefinitionId;
```

Defined in: [gen/types.gen.ts:5907](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5907)

The process definition ID associated with this message subscription.

---

### processDefinitionKey

```ts
processDefinitionKey: ProcessDefinitionKey;
```

Defined in: [gen/types.gen.ts:5915](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5915)

The process definition key associated with this message subscription.

---

### processInstancesWithActiveSubscriptions

```ts
processInstancesWithActiveSubscriptions: number;
```

Defined in: [gen/types.gen.ts:5919](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5919)

The number of process instances with active message subscriptions.

---

### tenantId

```ts
tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:5911](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5911)

The tenant ID associated with this message subscription.
