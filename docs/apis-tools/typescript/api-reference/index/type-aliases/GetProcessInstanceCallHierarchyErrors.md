---
title: "Type Alias: GetProcessInstanceCallHierarchyErrors"
sidebar_label: "GetProcessInstanceCallHierarchyErrors"
mdx:
  format: md
---

# Type Alias: GetProcessInstanceCallHierarchyErrors

```ts
type GetProcessInstanceCallHierarchyErrors = object;
```

Defined in: [gen/types.gen.ts:13892](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L13892)

## Properties

### 400

```ts
400: ProblemDetail;
```

Defined in: [gen/types.gen.ts:13896](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L13896)

The provided data is not valid.

---

### 401

```ts
401: ProblemDetail;
```

Defined in: [gen/types.gen.ts:13900](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L13900)

The request lacks valid authentication credentials.

---

### 403

```ts
403: ProblemDetail;
```

Defined in: [gen/types.gen.ts:13904](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L13904)

Forbidden. The request is not allowed.

---

### 404

```ts
404: ProblemDetail;
```

Defined in: [gen/types.gen.ts:13908](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L13908)

The process instance is not found.

---

### 500

```ts
500: ProblemDetail;
```

Defined in: [gen/types.gen.ts:13912](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L13912)

An internal error occurred while processing the request.
