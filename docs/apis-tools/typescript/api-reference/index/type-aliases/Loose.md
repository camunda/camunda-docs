---
title: "Type Alias: Loose<T>"
sidebar_label: "Loose<T>"
mdx:
  format: md
---

# Type Alias: Loose\<T\>

```ts
type Loose<T> = IsBrandedKey<T> extends true ? string : T extends CancelablePromise<infer P> ? CancelablePromise<Loose<P>> : T extends Promise<infer P> ? Promise<Loose<P>> : T extends infer U[] ? Loose<U>[] : T extends ReadonlyArray<infer U> ? ReadonlyArray<Loose<U>> : T extends (...a) => infer R ? (...a) => Loose<R> : T extends object ? { [K in keyof T]: Loose<T[K]> } : T;
```

Defined in: [loose.ts:14](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/loose.ts#L14)

## Type Parameters

### T

`T`
