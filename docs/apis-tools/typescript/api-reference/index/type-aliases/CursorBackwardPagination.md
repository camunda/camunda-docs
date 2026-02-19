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

Defined in: [gen/types.gen.ts:6447](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6447)

Cursor-based backward pagination

## Properties

### before

```ts
before: StartCursor;
```

Defined in: [gen/types.gen.ts:6451](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6451)

Use the `startCursor` value from the previous response to fetch the previous page of results.

---

### limit?

```ts
optional limit: number;
```

Defined in: [gen/types.gen.ts:6455](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6455)

The maximum number of items to return in one request.
