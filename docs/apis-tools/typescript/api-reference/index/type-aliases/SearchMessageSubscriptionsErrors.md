---
title: "Type Alias: SearchMessageSubscriptionsErrors"
sidebar_label: "SearchMessageSubscriptionsErrors"
mdx:
  format: md
---

# Type Alias: SearchMessageSubscriptionsErrors

```ts
type SearchMessageSubscriptionsErrors = object;
```

Defined in: [gen/types.gen.ts:12482](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L12482)

## Properties

### 400

```ts
400: ProblemDetail;
```

Defined in: [gen/types.gen.ts:12486](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L12486)

The provided data is not valid.

---

### 401

```ts
401: ProblemDetail;
```

Defined in: [gen/types.gen.ts:12490](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L12490)

The request lacks valid authentication credentials.

---

### 403

```ts
403: ProblemDetail;
```

Defined in: [gen/types.gen.ts:12494](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L12494)

Forbidden. The request is not allowed.

---

### 500

```ts
500: ProblemDetail;
```

Defined in: [gen/types.gen.ts:12498](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L12498)

An internal error occurred while processing the request.
