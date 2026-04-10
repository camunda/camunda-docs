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

(`err`) => `A`
