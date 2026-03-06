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

Defined in: [gen/types.gen.ts:1917](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1917)

A decision rule that matched within this decision evaluation.

## Properties

### evaluatedOutputs

```ts
evaluatedOutputs: EvaluatedDecisionOutputItem[];
```

Defined in: [gen/types.gen.ts:1929](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1929)

The evaluated decision outputs.

***

### ruleId?

```ts
optional ruleId: string;
```

Defined in: [gen/types.gen.ts:1921](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1921)

The ID of the matched rule.

***

### ruleIndex?

```ts
optional ruleIndex: number;
```

Defined in: [gen/types.gen.ts:1925](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1925)

The index of the matched rule.
