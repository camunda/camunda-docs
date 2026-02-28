---
title: "Type Alias: EvaluateDecisionResult"
sidebar_label: "EvaluateDecisionResult"
mdx:
  format: md
---

# Type Alias: EvaluateDecisionResult

```ts
type EvaluateDecisionResult = object;
```

Defined in: [gen/types.gen.ts:1556](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1556)

## Properties

### decisionDefinitionId

```ts
decisionDefinitionId: DecisionDefinitionId;
```

Defined in: [gen/types.gen.ts:1560](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1560)

The ID of the decision which was evaluated.

---

### decisionDefinitionKey

```ts
decisionDefinitionKey: DecisionDefinitionKey;
```

Defined in: [gen/types.gen.ts:1593](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1593)

The unique key identifying the decision which was evaluated.

---

### decisionDefinitionName

```ts
decisionDefinitionName: string;
```

Defined in: [gen/types.gen.ts:1564](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1564)

The name of the decision which was evaluated.

---

### decisionDefinitionVersion

```ts
decisionDefinitionVersion: number;
```

Defined in: [gen/types.gen.ts:1568](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1568)

The version of the decision which was evaluated.

---

### decisionEvaluationKey

```ts
decisionEvaluationKey: DecisionEvaluationKey;
```

Defined in: [gen/types.gen.ts:1607](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1607)

The unique key identifying this decision evaluation.

---

### ~~decisionInstanceKey?~~

```ts
optional decisionInstanceKey: DecisionInstanceKey;
```

Defined in: [gen/types.gen.ts:1603](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1603)

Deprecated, please refer to `decisionEvaluationKey`.

#### Deprecated

---

### decisionRequirementsId

```ts
decisionRequirementsId: string;
```

Defined in: [gen/types.gen.ts:1572](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1572)

The ID of the decision requirements graph that the decision which was evaluated is part of.

---

### decisionRequirementsKey

```ts
decisionRequirementsKey: DecisionRequirementsKey;
```

Defined in: [gen/types.gen.ts:1597](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1597)

The unique key identifying the decision requirements graph that the decision which was evaluated is part of.

---

### evaluatedDecisions

```ts
evaluatedDecisions: EvaluatedDecisionResult[];
```

Defined in: [gen/types.gen.ts:1611](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1611)

Decisions that were evaluated within the requested decision evaluation.

---

### failedDecisionDefinitionId

```ts
failedDecisionDefinitionId: DecisionDefinitionId;
```

Defined in: [gen/types.gen.ts:1581](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1581)

The ID of the decision which failed during evaluation.

---

### failureMessage

```ts
failureMessage: string;
```

Defined in: [gen/types.gen.ts:1585](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1585)

Message describing why the decision which was evaluated failed.

---

### output

```ts
output: string;
```

Defined in: [gen/types.gen.ts:1577](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1577)

JSON document that will instantiate the result of the decision which was evaluated.

---

### tenantId

```ts
tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:1589](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1589)

The tenant ID of the evaluated decision.
