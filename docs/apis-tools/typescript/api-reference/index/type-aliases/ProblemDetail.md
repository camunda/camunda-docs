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

Defined in: [gen/types.gen.ts:5706](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5706)

A Problem detail object as described in [RFC 9457](https://www.rfc-editor.org/rfc/rfc9457). There may be additional properties specific to the problem type.

## Properties

### detail

```ts
detail: string;
```

Defined in: [gen/types.gen.ts:5722](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5722)

An explanation of the problem in more detail.

***

### instance

```ts
instance: string;
```

Defined in: [gen/types.gen.ts:5726](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5726)

A URI path identifying the origin of the problem.

***

### status

```ts
status: number;
```

Defined in: [gen/types.gen.ts:5718](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5718)

The HTTP status code for this problem.

***

### title

```ts
title: string;
```

Defined in: [gen/types.gen.ts:5714](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5714)

A summary of the problem type.

***

### type

```ts
type: string;
```

Defined in: [gen/types.gen.ts:5710](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5710)

A URI identifying the problem type.
