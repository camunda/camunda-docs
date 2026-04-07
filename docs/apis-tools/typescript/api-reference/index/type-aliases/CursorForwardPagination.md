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

Defined in: [gen/types.gen.ts:7153](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L7153)

Cursor-based forward pagination

## Properties

### after

```ts
after: EndCursor;
```

Defined in: [gen/types.gen.ts:7157](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L7157)

Use the `endCursor` value from the previous response to fetch the next page of results.

---

### limit?

```ts
optional limit?: number;
```

Defined in: [gen/types.gen.ts:7161](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L7161)

The maximum number of items to return in one request.
