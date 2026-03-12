---
title: "Type Alias: SearchQueryPageResponse"
sidebar_label: "SearchQueryPageResponse"
mdx:
  format: md
---

# Type Alias: SearchQueryPageResponse

```ts
type SearchQueryPageResponse = object;
```

Defined in: [gen/types.gen.ts:7179](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L7179)

Pagination information about the search results.

## Properties

### endCursor

```ts
endCursor: EndCursor | null;
```

Defined in: [gen/types.gen.ts:7197](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L7197)

The cursor value for getting the next page of results. Use this in the `after` field of an ensuing request.

***

### hasMoreTotalItems

```ts
hasMoreTotalItems: boolean;
```

Defined in: [gen/types.gen.ts:7189](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L7189)

Indicates whether there are more items matching the criteria beyond the returned items.
This is useful for determining if additional requests are needed to retrieve all results.

***

### startCursor

```ts
startCursor: StartCursor | null;
```

Defined in: [gen/types.gen.ts:7193](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L7193)

The cursor value for getting the previous page of results. Use this in the `before` field of an ensuing request.

***

### totalItems

```ts
totalItems: number;
```

Defined in: [gen/types.gen.ts:7183](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L7183)

Total items matching the criteria.
