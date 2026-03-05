---
title: "Type Alias: CursorBackwardPagination"
sidebar_label: "CursorBackwardPagination"
mdx:
  format: md
---

# Type Alias: CursorBackwardPagination

```ts
type CursorBackwardPagination = object;
```

Defined in: [gen/types.gen.ts:7081](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7081)

Cursor-based backward pagination

## Properties

### before

```ts
before: StartCursor;
```

Defined in: [gen/types.gen.ts:7085](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7085)

Use the `startCursor` value from the previous response to fetch the previous page of results.

***

### limit?

```ts
optional limit: number;
```

Defined in: [gen/types.gen.ts:7089](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7089)

The maximum number of items to return in one request.
