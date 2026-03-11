---
title: "Type Alias: SearchAuditLogsErrors"
sidebar_label: "SearchAuditLogsErrors"
mdx:
  format: md
---

# Type Alias: SearchAuditLogsErrors

```ts
type SearchAuditLogsErrors = object;
```

Defined in: [gen/types.gen.ts:7649](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L7649)

## Properties

### 400

```ts
400: ProblemDetail;
```

Defined in: [gen/types.gen.ts:7653](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L7653)

The provided data is not valid.

---

### 401

```ts
401: ProblemDetail;
```

Defined in: [gen/types.gen.ts:7657](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L7657)

The request lacks valid authentication credentials.

---

### 403

```ts
403: ProblemDetail;
```

Defined in: [gen/types.gen.ts:7661](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L7661)

Forbidden. The request is not allowed.

---

### 500

```ts
500: unknown;
```

Defined in: [gen/types.gen.ts:7665](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L7665)

An internal error occurred while processing the request.
