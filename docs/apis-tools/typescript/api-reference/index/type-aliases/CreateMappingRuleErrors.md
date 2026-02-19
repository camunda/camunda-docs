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

Defined in: [gen/types.gen.ts:12216](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L12216)

## Properties

### 400

```ts
400: ProblemDetail;
```

Defined in: [gen/types.gen.ts:12220](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L12220)

The provided data is not valid.

---

### 403

```ts
403: ProblemDetail;
```

Defined in: [gen/types.gen.ts:12226](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L12226)

The request to create a mapping rule was denied.
More details are provided in the response body.

---

### 404

```ts
404: ProblemDetail;
```

Defined in: [gen/types.gen.ts:12230](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L12230)

The request to create a mapping rule was denied.

---

### 500

```ts
500: ProblemDetail;
```

Defined in: [gen/types.gen.ts:12234](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L12234)

An internal error occurred while processing the request.
