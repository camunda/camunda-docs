---
title: "Type Alias: GetProcessInstanceStatisticsErrors"
sidebar_label: "GetProcessInstanceStatisticsErrors"
mdx:
  format: md
---

# Type Alias: GetProcessInstanceStatisticsErrors

```ts
type GetProcessInstanceStatisticsErrors = object;
```

Defined in: [gen/types.gen.ts:14364](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L14364)

## Properties

### 400

```ts
400: ProblemDetail;
```

Defined in: [gen/types.gen.ts:14368](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L14368)

The provided data is not valid.

---

### 401

```ts
401: ProblemDetail;
```

Defined in: [gen/types.gen.ts:14372](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L14372)

The request lacks valid authentication credentials.

---

### 403

```ts
403: ProblemDetail;
```

Defined in: [gen/types.gen.ts:14376](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L14376)

Forbidden. The request is not allowed.

---

### 500

```ts
500: ProblemDetail;
```

Defined in: [gen/types.gen.ts:14380](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L14380)

An internal error occurred while processing the request.
