---
title: "Type Alias: GetMappingRuleErrors"
sidebar_label: "GetMappingRuleErrors"
mdx:
  format: md
---

# Type Alias: GetMappingRuleErrors

```ts
type GetMappingRuleErrors = object;
```

Defined in: [gen/types.gen.ts:12419](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L12419)

## Properties

### 401

```ts
401: ProblemDetail;
```

Defined in: [gen/types.gen.ts:12423](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L12423)

The request lacks valid authentication credentials.

---

### 404

```ts
404: ProblemDetail;
```

Defined in: [gen/types.gen.ts:12427](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L12427)

The mapping rule with the mappingRuleId was not found.

---

### 500

```ts
500: ProblemDetail;
```

Defined in: [gen/types.gen.ts:12431](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L12431)

An internal error occurred while processing the request.
