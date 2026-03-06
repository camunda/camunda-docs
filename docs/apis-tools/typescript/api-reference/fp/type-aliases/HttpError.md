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

Defined in: [fp-ts.ts:20](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/fp-ts.ts#L20)

## Type Declaration

### body?

```ts
optional body: any;
```

### message?

```ts
optional message: string;
```

### name?

```ts
optional name: string;
```

### status?

```ts
optional status: number;
```
