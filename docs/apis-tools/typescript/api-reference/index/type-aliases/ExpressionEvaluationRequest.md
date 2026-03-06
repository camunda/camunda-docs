---
title: "Type Alias: ExpressionEvaluationRequest"
sidebar_label: "ExpressionEvaluationRequest"
mdx:
  format: md
---

# Type Alias: ExpressionEvaluationRequest

```ts
type ExpressionEvaluationRequest = object;
```

Defined in: [gen/types.gen.ts:2730](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2730)

## Properties

### expression

```ts
expression: string;
```

Defined in: [gen/types.gen.ts:2734](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2734)

The expression to evaluate (e.g., "=x + y")

***

### tenantId?

```ts
optional tenantId: string;
```

Defined in: [gen/types.gen.ts:2738](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2738)

Required when the expression references tenant-scoped cluster variables

***

### variables?

```ts
optional variables: 
  | {
[key: string]: unknown;
}
  | null;
```

Defined in: [gen/types.gen.ts:2742](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2742)

Optional variables for expression evaluation. These variables are only used for the current evaluation and do not persist beyond it.
