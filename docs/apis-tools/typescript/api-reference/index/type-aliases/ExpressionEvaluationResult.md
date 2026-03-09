---
title: "Type Alias: ExpressionEvaluationResult"
sidebar_label: "ExpressionEvaluationResult"
mdx:
  format: md
---

# Type Alias: ExpressionEvaluationResult

```ts
type ExpressionEvaluationResult = object;
```

Defined in: [gen/types.gen.ts:2594](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2594)

## Properties

### expression

```ts
expression: string;
```

Defined in: [gen/types.gen.ts:2598](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2598)

The evaluated expression

---

### result

```ts
result: unknown;
```

Defined in: [gen/types.gen.ts:2602](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2602)

The result value. Its type can vary.

---

### warnings

```ts
warnings: string[];
```

Defined in: [gen/types.gen.ts:2606](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2606)

List of warnings generated during expression evaluation
