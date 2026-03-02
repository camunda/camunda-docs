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

Defined in: [gen/types.gen.ts:1818](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1818)

## Type Declaration

### evaluatedInputs?

```ts
optional evaluatedInputs: EvaluatedDecisionInputItem[];
```

The evaluated inputs of the decision instance.

### matchedRules?

```ts
optional matchedRules: MatchedDecisionRuleItem[];
```

The matched rules of the decision instance.
