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

Defined in: [gen/types.gen.ts:2728](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2728)

## Properties

### expression

```ts
expression: string;
```

Defined in: [gen/types.gen.ts:2732](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2732)

The expression to evaluate (e.g., "=x + y")

---

### tenantId?

```ts
optional tenantId?: string;
```

Defined in: [gen/types.gen.ts:2736](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2736)

Required when the expression references tenant-scoped cluster variables

---

### variables?

```ts
optional variables?:
  | {
[key: string]: unknown;
}
  | null;
```

Defined in: [gen/types.gen.ts:2740](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2740)

Optional variables for expression evaluation. These variables are only used for the current evaluation and do not persist beyond it.
