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

Defined in: [gen/types.gen.ts:5636](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5636)

A Problem detail object as described in [RFC 9457](https://www.rfc-editor.org/rfc/rfc9457). There may be additional properties specific to the problem type.

## Properties

### detail

```ts
detail: string;
```

Defined in: [gen/types.gen.ts:5652](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5652)

An explanation of the problem in more detail.

***

### instance

```ts
instance: string;
```

Defined in: [gen/types.gen.ts:5656](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5656)

A URI path identifying the origin of the problem.

***

### status

```ts
status: number;
```

Defined in: [gen/types.gen.ts:5648](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5648)

The HTTP status code for this problem.

***

### title

```ts
title: string;
```

Defined in: [gen/types.gen.ts:5644](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5644)

A summary of the problem type.

***

### type

```ts
type: string;
```

Defined in: [gen/types.gen.ts:5640](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5640)

A URI identifying the problem type.
