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

Pagination information about the search results.

## Properties

### endCursor

```ts
endCursor: EndCursor | null;
```

The cursor value for getting the next page of results. Use this in the `after` field of an ensuing request.

---

### hasMoreTotalItems

```ts
hasMoreTotalItems: boolean;
```

Indicates whether the `totalItems` value has been capped due to system limits. When true, `totalItems` is a lower bound and the actual number of matching items is greater than the reported value.

---

### startCursor

```ts
startCursor: StartCursor | null;
```

The cursor value for getting the previous page of results. Use this in the `before` field of an ensuing request.

---

### totalItems

```ts
totalItems: number;
```

Total items matching the criteria.
