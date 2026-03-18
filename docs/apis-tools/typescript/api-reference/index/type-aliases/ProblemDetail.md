---
title: "Type Alias: ProblemDetail"
sidebar_label: "ProblemDetail"
mdx:
  format: md
---

# Type Alias: ProblemDetail

```ts
type ProblemDetail = object;
```

Defined in: [gen/types.gen.ts:5054](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5054)

A Problem detail object as described in [RFC 9457](https://www.rfc-editor.org/rfc/rfc9457). There may be additional properties specific to the problem type.

## Properties

### detail?

```ts
optional detail: string;
```

Defined in: [gen/types.gen.ts:5070](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5070)

An explanation of the problem in more detail.

---

### instance?

```ts
optional instance: string;
```

Defined in: [gen/types.gen.ts:5074](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5074)

A URI path identifying the origin of the problem.

---

### status?

```ts
optional status: number;
```

Defined in: [gen/types.gen.ts:5066](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5066)

The HTTP status code for this problem.

---

### title?

```ts
optional title: string;
```

Defined in: [gen/types.gen.ts:5062](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5062)

A summary of the problem type.

---

### type?

```ts
optional type: string;
```

Defined in: [gen/types.gen.ts:5058](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5058)

A URI identifying the problem type.
