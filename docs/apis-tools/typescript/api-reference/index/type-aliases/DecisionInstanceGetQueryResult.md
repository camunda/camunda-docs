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

Defined in: [gen/types.gen.ts:1855](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L1855)

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
