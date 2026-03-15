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

Defined in: [gen/types.gen.ts:2749](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L2749)

## Properties

### expression

```ts
expression: string;
```

Defined in: [gen/types.gen.ts:2753](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L2753)

The evaluated expression

***

### result

```ts
result: unknown;
```

Defined in: [gen/types.gen.ts:2757](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L2757)

The result value. Its type can vary.

***

### warnings

```ts
warnings: string[];
```

Defined in: [gen/types.gen.ts:2761](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L2761)

List of warnings generated during expression evaluation
