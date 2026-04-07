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

Defined in: [gen/types.gen.ts:7190](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L7190)

Pagination information about the search results.

## Properties

### endCursor

```ts
endCursor: EndCursor | null;
```

Defined in: [gen/types.gen.ts:7207](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L7207)

The cursor value for getting the next page of results. Use this in the `after` field of an ensuing request.

---

### hasMoreTotalItems

```ts
hasMoreTotalItems: boolean;
```

Defined in: [gen/types.gen.ts:7199](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L7199)

Indicates whether the `totalItems` value has been capped due to system limits. When true, `totalItems` is a lower bound and the actual number of matching items is greater than the reported value.

---

### startCursor

```ts
startCursor: StartCursor | null;
```

Defined in: [gen/types.gen.ts:7203](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L7203)

The cursor value for getting the previous page of results. Use this in the `before` field of an ensuing request.

---

### totalItems

```ts
totalItems: number;
```

Defined in: [gen/types.gen.ts:7194](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L7194)

Total items matching the criteria.
