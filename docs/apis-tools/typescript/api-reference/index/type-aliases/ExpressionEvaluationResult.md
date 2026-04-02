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

Defined in: [gen/types.gen.ts:2745](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2745)

## Properties

### expression

```ts
expression: string;
```

Defined in: [gen/types.gen.ts:2749](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2749)

The evaluated expression

---

### result

```ts
result: unknown;
```

Defined in: [gen/types.gen.ts:2753](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2753)

The result value. Its type can vary.

---

### warnings

```ts
warnings: ExpressionEvaluationWarningItem[];
```

Defined in: [gen/types.gen.ts:2757](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2757)

List of warnings generated during expression evaluation
