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

Defined in: [gen/types.gen.ts:1359](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1359)

## Properties

### conditionalEvaluationKey

```ts
conditionalEvaluationKey: ConditionalEvaluationKey;
```

Defined in: [gen/types.gen.ts:1363](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1363)

The unique key of the conditional evaluation operation.

---

### processInstances

```ts
processInstances: ProcessInstanceReference[];
```

Defined in: [gen/types.gen.ts:1371](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1371)

List of process instances created. If no root-level conditional start events evaluated to true, the list will be empty.

---

### tenantId

```ts
tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:1367](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1367)

The tenant ID of the conditional evaluation operation.
