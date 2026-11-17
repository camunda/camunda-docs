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
