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

Defined in: [gen/types.gen.ts:2747](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2747)

## Properties

### expression

```ts
expression: string;
```

Defined in: [gen/types.gen.ts:2751](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2751)

The evaluated expression

***

### result

```ts
result: unknown;
```

Defined in: [gen/types.gen.ts:2755](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2755)

The result value. Its type can vary.

***

### warnings

```ts
warnings: string[];
```

Defined in: [gen/types.gen.ts:2759](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2759)

List of warnings generated during expression evaluation
