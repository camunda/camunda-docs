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

Defined in: [gen/types.gen.ts:1648](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L1648)

A decision that was evaluated.

## Properties

### decisionDefinitionId

```ts
decisionDefinitionId: DecisionDefinitionId;
```

Defined in: [gen/types.gen.ts:1652](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L1652)

The ID of the decision which was evaluated.

---

### decisionDefinitionKey

```ts
decisionDefinitionKey: DecisionDefinitionKey;
```

Defined in: [gen/types.gen.ts:1685](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L1685)

The unique key identifying the decision which was evaluate.

---

### decisionDefinitionName

```ts
decisionDefinitionName: string;
```

Defined in: [gen/types.gen.ts:1656](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L1656)

The name of the decision which was evaluated.

---

### decisionDefinitionType

```ts
decisionDefinitionType: string;
```

Defined in: [gen/types.gen.ts:1664](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L1664)

The type of the decision which was evaluated.

---

### decisionDefinitionVersion

```ts
decisionDefinitionVersion: number;
```

Defined in: [gen/types.gen.ts:1660](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L1660)

The version of the decision which was evaluated.

---

### decisionEvaluationInstanceKey

```ts
decisionEvaluationInstanceKey: DecisionEvaluationInstanceKey;
```

Defined in: [gen/types.gen.ts:1689](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L1689)

The unique key identifying this decision evaluation instance.

---

### evaluatedInputs

```ts
evaluatedInputs: EvaluatedDecisionInputItem[];
```

Defined in: [gen/types.gen.ts:1681](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L1681)

The decision inputs that were evaluated within this decision evaluation.

---

### matchedRules

```ts
matchedRules: MatchedDecisionRuleItem[];
```

Defined in: [gen/types.gen.ts:1677](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L1677)

The decision rules that matched within this decision evaluation.

---

### output

```ts
output: string;
```

Defined in: [gen/types.gen.ts:1669](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L1669)

JSON document that will instantiate the result of the decision which was evaluated.

---

### tenantId

```ts
tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:1673](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L1673)

The tenant ID of the evaluated decision.
