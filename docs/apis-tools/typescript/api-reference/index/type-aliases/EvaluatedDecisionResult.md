---
title: "Type Alias: EvaluatedDecisionResult"
sidebar_label: "EvaluatedDecisionResult"
mdx:
  format: md
---

# Type Alias: EvaluatedDecisionResult

```ts
type EvaluatedDecisionResult = object;
```

Defined in: [gen/types.gen.ts:1617](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1617)

A decision that was evaluated.

## Properties

### decisionDefinitionId?

```ts
optional decisionDefinitionId: DecisionDefinitionId;
```

Defined in: [gen/types.gen.ts:1621](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1621)

The ID of the decision which was evaluated.

---

### decisionDefinitionKey?

```ts
optional decisionDefinitionKey: DecisionDefinitionKey;
```

Defined in: [gen/types.gen.ts:1654](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1654)

The unique key identifying the decision which was evaluate.

---

### decisionDefinitionName?

```ts
optional decisionDefinitionName: string;
```

Defined in: [gen/types.gen.ts:1625](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1625)

The name of the decision which was evaluated.

---

### decisionDefinitionType?

```ts
optional decisionDefinitionType: string;
```

Defined in: [gen/types.gen.ts:1633](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1633)

The type of the decision which was evaluated.

---

### decisionDefinitionVersion?

```ts
optional decisionDefinitionVersion: number;
```

Defined in: [gen/types.gen.ts:1629](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1629)

The version of the decision which was evaluated.

---

### decisionEvaluationInstanceKey?

```ts
optional decisionEvaluationInstanceKey: DecisionEvaluationInstanceKey;
```

Defined in: [gen/types.gen.ts:1658](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1658)

The unique key identifying this decision evaluation instance.

---

### evaluatedInputs?

```ts
optional evaluatedInputs: EvaluatedDecisionInputItem[];
```

Defined in: [gen/types.gen.ts:1650](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1650)

The decision inputs that were evaluated within this decision evaluation.

---

### matchedRules?

```ts
optional matchedRules: MatchedDecisionRuleItem[];
```

Defined in: [gen/types.gen.ts:1646](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1646)

The decision rules that matched within this decision evaluation.

---

### output?

```ts
optional output: string;
```

Defined in: [gen/types.gen.ts:1638](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1638)

JSON document that will instantiate the result of the decision which was evaluated.

---

### tenantId?

```ts
optional tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:1642](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1642)

The tenant ID of the evaluated decision.
