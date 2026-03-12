---
title: "Type Alias: MatchedDecisionRuleItem"
sidebar_label: "MatchedDecisionRuleItem"
mdx:
  format: md
---

# Type Alias: MatchedDecisionRuleItem

```ts
type MatchedDecisionRuleItem = object;
```

Defined in: [gen/types.gen.ts:1919](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L1919)

A decision rule that matched within this decision evaluation.

## Properties

### evaluatedOutputs

```ts
evaluatedOutputs: EvaluatedDecisionOutputItem[];
```

Defined in: [gen/types.gen.ts:1931](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L1931)

The evaluated decision outputs.

***

### ruleId

```ts
ruleId: string;
```

Defined in: [gen/types.gen.ts:1923](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L1923)

The ID of the matched rule.

***

### ruleIndex

```ts
ruleIndex: number;
```

Defined in: [gen/types.gen.ts:1927](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L1927)

The index of the matched rule.
