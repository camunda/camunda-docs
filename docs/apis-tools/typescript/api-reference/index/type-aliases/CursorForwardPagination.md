---
title: "Type Alias: CursorForwardPagination"
sidebar_label: "CursorForwardPagination"
mdx:
  format: md
---

# Type Alias: CursorForwardPagination

```ts
type CursorForwardPagination = object;
```

Defined in: [gen/types.gen.ts:7067](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7067)

Cursor-based forward pagination

## Properties

### after

```ts
after: EndCursor;
```

Defined in: [gen/types.gen.ts:7071](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7071)

Use the `endCursor` value from the previous response to fetch the next page of results.

***

### limit?

```ts
optional limit: number;
```

Defined in: [gen/types.gen.ts:7075](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7075)

The maximum number of items to return in one request.
