---
title: "Type Alias: GetAuthenticationErrors"
sidebar_label: "GetAuthenticationErrors"
mdx:
  format: md
---

# Type Alias: GetAuthenticationErrors

```ts
type GetAuthenticationErrors = object;
```

Defined in: [gen/types.gen.ts:7953](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L7953)

## Properties

### 401

```ts
401: ProblemDetail;
```

Defined in: [gen/types.gen.ts:7957](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L7957)

The request lacks valid authentication credentials.

---

### 403

```ts
403: ProblemDetail;
```

Defined in: [gen/types.gen.ts:7961](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L7961)

Forbidden. The request is not allowed.

---

### 500

```ts
500: ProblemDetail;
```

Defined in: [gen/types.gen.ts:7965](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L7965)

An internal error occurred while processing the request.
