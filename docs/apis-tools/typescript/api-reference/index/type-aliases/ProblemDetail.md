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

Defined in: [gen/types.gen.ts:5709](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5709)

A Problem detail object as described in [RFC 9457](https://www.rfc-editor.org/rfc/rfc9457). There may be additional properties specific to the problem type.

## Properties

### detail

```ts
detail: string;
```

Defined in: [gen/types.gen.ts:5725](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5725)

An explanation of the problem in more detail.

---

### instance

```ts
instance: string;
```

Defined in: [gen/types.gen.ts:5729](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5729)

A URI path identifying the origin of the problem.

---

### status

```ts
status: number;
```

Defined in: [gen/types.gen.ts:5721](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5721)

The HTTP status code for this problem.

---

### title

```ts
title: string;
```

Defined in: [gen/types.gen.ts:5717](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5717)

A summary of the problem type.

---

### type

```ts
type: string;
```

Defined in: [gen/types.gen.ts:5713](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5713)

A URI identifying the problem type.
