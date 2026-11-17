---
title: "Function: isPresentWhenUnsupportedError()"
sidebar_label: "isPresentWhenUnsupportedError()"
mdx:
  format: md
---

# Function: isPresentWhenUnsupportedError()

```ts
function isPresentWhenUnsupportedError(e): e is PresentWhenUnsupportedError;
```

Discriminates the terminal dependent-presence guard error. A worker poll loop
uses this to stop instead of rescheduling: the fault is a server/contract
mismatch, not a transient transport error, so exponential backoff would loop
forever.

## Parameters

### e

`unknown`

## Returns

`e is PresentWhenUnsupportedError`
