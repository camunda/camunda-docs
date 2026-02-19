---
title: "Type Alias: SearchUserTasksErrors"
sidebar_label: "SearchUserTasksErrors"
mdx:
  format: md
---

# Type Alias: SearchUserTasksErrors

```ts
type SearchUserTasksErrors = object;
```

Defined in: [gen/types.gen.ts:16776](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L16776)

## Properties

### 400

```ts
400: ProblemDetail;
```

Defined in: [gen/types.gen.ts:16780](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L16780)

The provided data is not valid.

---

### 401

```ts
401: ProblemDetail;
```

Defined in: [gen/types.gen.ts:16784](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L16784)

The request lacks valid authentication credentials.

---

### 403

```ts
403: ProblemDetail;
```

Defined in: [gen/types.gen.ts:16788](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L16788)

Forbidden. The request is not allowed.

---

### 500

```ts
500: ProblemDetail;
```

Defined in: [gen/types.gen.ts:16792](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L16792)

An internal error occurred while processing the request.
