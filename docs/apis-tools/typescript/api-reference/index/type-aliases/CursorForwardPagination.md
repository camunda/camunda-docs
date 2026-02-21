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

Defined in: [gen/types.gen.ts:6433](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6433)

Cursor-based forward pagination

## Properties

### after

```ts
after: EndCursor;
```

Defined in: [gen/types.gen.ts:6437](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6437)

Use the `endCursor` value from the previous response to fetch the next page of results.

---

### limit?

```ts
optional limit: number;
```

Defined in: [gen/types.gen.ts:6441](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6441)

The maximum number of items to return in one request.
