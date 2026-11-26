---
title: "Type Alias: CreateProbeResponses"
sidebar_label: "CreateProbeResponses"
mdx:
  format: md
---

# Type Alias: CreateProbeResponses

```ts
type CreateProbeResponses = object;
```

## Properties

### 200

```ts
200: ProbeResult;
```

A worker answered. The body is one of three shapes, chosen by `outcome`: `OK` with the
worker's `data`, `UNSUPPORTED`, or `ERROR` with a `message`.
