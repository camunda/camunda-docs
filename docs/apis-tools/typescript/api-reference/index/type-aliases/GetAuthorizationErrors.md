---
title: "Type Alias: GetAuthorizationErrors"
sidebar_label: "GetAuthorizationErrors"
mdx:
  format: md
---

# Type Alias: GetAuthorizationErrors

```ts
type GetAuthorizationErrors = object;
```

Defined in: [gen/types.gen.ts:8117](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L8117)

## Properties

### 401

```ts
401: ProblemDetail;
```

Defined in: [gen/types.gen.ts:8121](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L8121)

The request lacks valid authentication credentials.

---

### 403

```ts
403: ProblemDetail;
```

Defined in: [gen/types.gen.ts:8125](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L8125)

Forbidden. The request is not allowed.

---

### 404

```ts
404: ProblemDetail;
```

Defined in: [gen/types.gen.ts:8129](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L8129)

The authorization with the given key was not found.

---

### 500

```ts
500: ProblemDetail;
```

Defined in: [gen/types.gen.ts:8133](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L8133)

An internal error occurred while processing the request.
