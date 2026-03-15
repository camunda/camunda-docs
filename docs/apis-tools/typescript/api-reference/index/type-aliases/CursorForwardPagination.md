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

Defined in: [gen/types.gen.ts:7142](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L7142)

Cursor-based forward pagination

## Properties

### after

```ts
after: EndCursor;
```

Defined in: [gen/types.gen.ts:7146](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L7146)

Use the `endCursor` value from the previous response to fetch the next page of results.

***

### limit?

```ts
optional limit: number;
```

Defined in: [gen/types.gen.ts:7150](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L7150)

The maximum number of items to return in one request.
