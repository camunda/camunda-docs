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

Defined in: [gen/types.gen.ts:1857](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1857)

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
