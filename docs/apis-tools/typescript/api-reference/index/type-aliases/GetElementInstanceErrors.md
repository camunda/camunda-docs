---
title: "Type Alias: GetElementInstanceErrors"
sidebar_label: "GetElementInstanceErrors"
mdx:
  format: md
---

# Type Alias: GetElementInstanceErrors

```ts
type GetElementInstanceErrors = object;
```

Defined in: [gen/types.gen.ts:10388](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L10388)

## Properties

### 400

```ts
400: ProblemDetail;
```

Defined in: [gen/types.gen.ts:10392](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L10392)

The provided data is not valid.

---

### 401

```ts
401: ProblemDetail;
```

Defined in: [gen/types.gen.ts:10396](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L10396)

The request lacks valid authentication credentials.

---

### 403

```ts
403: ProblemDetail;
```

Defined in: [gen/types.gen.ts:10400](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L10400)

Forbidden. The request is not allowed.

---

### 404

```ts
404: ProblemDetail;
```

Defined in: [gen/types.gen.ts:10406](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L10406)

The element instance with the given key was not found.
More details are provided in the response body.

---

### 500

```ts
500: ProblemDetail;
```

Defined in: [gen/types.gen.ts:10410](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L10410)

An internal error occurred while processing the request.
