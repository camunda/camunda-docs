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

## Properties

### activeSubscriptions

```ts
activeSubscriptions: number;
```

The total number of active message subscriptions for this process definition key.

---

### processDefinitionId

```ts
processDefinitionId: ProcessDefinitionId;
```

The process definition ID associated with this message subscription.

---

### processDefinitionKey

```ts
processDefinitionKey: ProcessDefinitionKey;
```

The process definition key associated with this message subscription.

---

### processInstancesWithActiveSubscriptions

```ts
processInstancesWithActiveSubscriptions: number;
```

The number of process instances with active message subscriptions.

---

### tenantId

```ts
tenantId: TenantId;
```

The tenant ID associated with this message subscription.
