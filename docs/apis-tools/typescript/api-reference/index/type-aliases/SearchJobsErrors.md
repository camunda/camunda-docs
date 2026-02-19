---
title: "Type Alias: SearchJobsErrors"
sidebar_label: "SearchJobsErrors"
mdx:
  format: md
---

# Type Alias: SearchJobsErrors

```ts
type SearchJobsErrors = object;
```

Defined in: [gen/types.gen.ts:11819](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L11819)

## Properties

### 400

```ts
400: ProblemDetail;
```

Defined in: [gen/types.gen.ts:11823](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L11823)

The provided data is not valid.

---

### 401

```ts
401: ProblemDetail;
```

Defined in: [gen/types.gen.ts:11827](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L11827)

The request lacks valid authentication credentials.

---

### 403

```ts
403: ProblemDetail;
```

Defined in: [gen/types.gen.ts:11831](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L11831)

Forbidden. The request is not allowed.

---

### 500

```ts
500: ProblemDetail;
```

Defined in: [gen/types.gen.ts:11835](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L11835)

An internal error occurred while processing the request.
