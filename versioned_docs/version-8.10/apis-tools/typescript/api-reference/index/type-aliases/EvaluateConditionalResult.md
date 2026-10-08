---
title: "Type Alias: EvaluateConditionalResult"
sidebar_label: "EvaluateConditionalResult"
mdx:
  format: md
---

# Type Alias: EvaluateConditionalResult

```ts
type EvaluateConditionalResult = object;
```

## Properties

### conditionalEvaluationKey

```ts
conditionalEvaluationKey: ConditionalEvaluationKey;
```

The unique key of the conditional evaluation operation.

---

### processInstances

```ts
processInstances: ProcessInstanceReference[];
```

List of process instances created. If no root-level conditional start events evaluated to true, the list will be empty.

---

### tenantId

```ts
tenantId: TenantId;
```

The tenant ID of the conditional evaluation operation.
