---
title: "Type Alias: HttpError"
sidebar_label: "HttpError"
mdx:
  format: md
---

# Type Alias: HttpError

:::caution Technical Preview
The Functional Programming API is a **technical preview**. Its surface may change in future releases without following semver.
:::

```ts
type HttpError = object & Record<string, any>;
```

Defined in: [fp-ts.ts:20](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/fp-ts.ts#L20)

## Type Declaration

### body?

```ts
optional body?: any;
```

### message?

```ts
optional message?: string;
```

### name?

```ts
optional name?: string;
```

### status?

```ts
optional status?: number;
```
