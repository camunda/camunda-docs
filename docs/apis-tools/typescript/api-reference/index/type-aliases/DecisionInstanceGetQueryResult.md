---
title: "Type Alias: DecisionInstanceGetQueryResult"
sidebar_label: "DecisionInstanceGetQueryResult"
mdx:
  format: md
---

# Type Alias: DecisionInstanceGetQueryResult

```ts
type DecisionInstanceGetQueryResult = DecisionInstanceResult & object;
```

Defined in: [gen/types.gen.ts:1859](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L1859)

## Type Declaration

### evaluatedInputs

```ts
evaluatedInputs: EvaluatedDecisionInputItem[];
```

The evaluated inputs of the decision instance.

### matchedRules

```ts
matchedRules: MatchedDecisionRuleItem[];
```

The matched rules of the decision instance.
