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

Defined in: [gen/types.gen.ts:6470](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6470)

Pagination information about the search results.

## Properties

### endCursor?

```ts
optional endCursor: EndCursor;
```

Defined in: [gen/types.gen.ts:6488](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6488)

The cursor value for getting the next page of results. Use this in the `after` field of an ensuing request.

---

### hasMoreTotalItems?

```ts
optional hasMoreTotalItems: boolean;
```

Defined in: [gen/types.gen.ts:6480](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6480)

Indicates whether there are more items matching the criteria beyond the returned items.
This is useful for determining if additional requests are needed to retrieve all results.

---

### startCursor?

```ts
optional startCursor: StartCursor;
```

Defined in: [gen/types.gen.ts:6484](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6484)

The cursor value for getting the previous page of results. Use this in the `before` field of an ensuing request.

---

### totalItems

```ts
totalItems: number;
```

Defined in: [gen/types.gen.ts:6474](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6474)

Total items matching the criteria.
