---
title: "Type Alias: CreateMappingRuleErrors"
sidebar_label: "CreateMappingRuleErrors"
mdx:
  format: md
---

# Type Alias: CreateMappingRuleErrors

```ts
type CreateMappingRuleErrors = object;
```

Defined in: [gen/types.gen.ts:12290](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L12290)

## Properties

### 400

```ts
400: ProblemDetail;
```

Defined in: [gen/types.gen.ts:12294](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L12294)

The provided data is not valid.

---

### 403

```ts
403: ProblemDetail;
```

Defined in: [gen/types.gen.ts:12300](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L12300)

The request to create a mapping rule was denied.
More details are provided in the response body.

---

### 404

```ts
404: ProblemDetail;
```

Defined in: [gen/types.gen.ts:12304](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L12304)

The request to create a mapping rule was denied.

---

### 500

```ts
500: ProblemDetail;
```

Defined in: [gen/types.gen.ts:12308](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L12308)

An internal error occurred while processing the request.
