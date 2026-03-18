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

Defined in: [gen/types.gen.ts:1854](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1854)

A decision rule that matched within this decision evaluation.

## Properties

### evaluatedOutputs?

```ts
optional evaluatedOutputs: EvaluatedDecisionOutputItem[];
```

Defined in: [gen/types.gen.ts:1866](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1866)

The evaluated decision outputs.

---

### ruleId?

```ts
optional ruleId: string;
```

Defined in: [gen/types.gen.ts:1858](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1858)

The ID of the matched rule.

---

### ruleIndex?

```ts
optional ruleIndex: number;
```

Defined in: [gen/types.gen.ts:1862](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1862)

The index of the matched rule.
