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

Defined in: [gen/types.gen.ts:7104](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7104)

Pagination information about the search results.

## Properties

### endCursor

```ts
endCursor: EndCursor | null;
```

Defined in: [gen/types.gen.ts:7122](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7122)

The cursor value for getting the next page of results. Use this in the `after` field of an ensuing request.

***

### hasMoreTotalItems

```ts
hasMoreTotalItems: boolean;
```

Defined in: [gen/types.gen.ts:7114](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7114)

Indicates whether there are more items matching the criteria beyond the returned items.
This is useful for determining if additional requests are needed to retrieve all results.

***

### startCursor

```ts
startCursor: StartCursor | null;
```

Defined in: [gen/types.gen.ts:7118](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7118)

The cursor value for getting the previous page of results. Use this in the `before` field of an ensuing request.

***

### totalItems

```ts
totalItems: number;
```

Defined in: [gen/types.gen.ts:7108](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7108)

Total items matching the criteria.
