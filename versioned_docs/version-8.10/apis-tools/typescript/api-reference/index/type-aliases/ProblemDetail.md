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

A Problem detail object as described in [RFC 9457](https://www.rfc-editor.org/rfc/rfc9457). There may be additional properties specific to the problem type.

## Properties

### detail

```ts
detail: string;
```

An explanation of the problem in more detail.

---

### instance

```ts
instance: string;
```

A URI path identifying the origin of the problem.

---

### status

```ts
status: number;
```

The HTTP status code for this problem.

---

### title

```ts
title: string;
```

A summary of the problem type.

---

### type

```ts
type: string;
```

A URI identifying the problem type.
