---
title: "Function: foldDomainError()"
sidebar_label: "foldDomainError()"
mdx:
  format: md
---

# Function: foldDomainError()

:::caution Technical Preview
The Functional Programming API is a **technical preview**. Its surface may change in future releases without following semver.
:::

```ts
function foldDomainError<A>(handlers): (err) => A;
```

Defined in: [fp-ts.ts:51](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/fp-ts.ts#L51)

## Type Parameters

### A

`A`

## Parameters

### handlers

#### generic

(`e`) => `A`

#### http

(`e`) => `A`

#### timeout

(`e`) => `A`

#### validation

(`e`) => `A`

## Returns

```ts
(err): A;
```

### Parameters

#### err

[`DomainError`](../type-aliases/DomainError.md)

### Returns

`A`
