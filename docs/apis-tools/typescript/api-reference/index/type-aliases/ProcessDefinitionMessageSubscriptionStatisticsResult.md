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

Defined in: [gen/types.gen.ts:5244](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5244)

## Properties

### activeSubscriptions?

```ts
optional activeSubscriptions: number;
```

Defined in: [gen/types.gen.ts:5264](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5264)

The total number of active message subscriptions for this process definition key.

---

### processDefinitionId?

```ts
optional processDefinitionId: ProcessDefinitionId;
```

Defined in: [gen/types.gen.ts:5248](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5248)

The process definition ID associated with this message subscription.

---

### processDefinitionKey?

```ts
optional processDefinitionKey: ProcessDefinitionKey;
```

Defined in: [gen/types.gen.ts:5256](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5256)

The process definition key associated with this message subscription.

---

### processInstancesWithActiveSubscriptions?

```ts
optional processInstancesWithActiveSubscriptions: number;
```

Defined in: [gen/types.gen.ts:5260](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5260)

The number of process instances with active message subscriptions.

---

### tenantId?

```ts
optional tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:5252](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5252)

The tenant ID associated with this message subscription.
