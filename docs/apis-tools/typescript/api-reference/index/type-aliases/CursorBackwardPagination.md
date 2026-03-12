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

Defined in: [gen/types.gen.ts:7156](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L7156)

Cursor-based backward pagination

## Properties

### before

```ts
before: StartCursor;
```

Defined in: [gen/types.gen.ts:7160](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L7160)

Use the `startCursor` value from the previous response to fetch the previous page of results.

***

### limit?

```ts
optional limit: number;
```

Defined in: [gen/types.gen.ts:7164](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L7164)

The maximum number of items to return in one request.
