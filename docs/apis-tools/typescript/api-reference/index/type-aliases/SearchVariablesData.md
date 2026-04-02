---
title: "Type Alias: SearchVariablesData"
sidebar_label: "SearchVariablesData"
mdx:
  format: md
---

# Type Alias: SearchVariablesData

```ts
type SearchVariablesData = object;
```

Defined in: [gen/types.gen.ts:16520](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L16520)

## Properties

### body?

```ts
optional body?: SearchQueryRequest & object;
```

Defined in: [gen/types.gen.ts:16524](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L16524)

Variable search query request.

#### Type Declaration

##### filter?

```ts
optional filter?: VariableFilter;
```

The variable search filters.

##### sort?

```ts
optional sort?: object[];
```

Sort field criteria.

---

### path?

```ts
optional path?: never;
```

Defined in: [gen/types.gen.ts:16540](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L16540)

---

### query?

```ts
optional query?: object;
```

Defined in: [gen/types.gen.ts:16541](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L16541)

#### truncateValues?

```ts
optional truncateValues?: boolean;
```

When true (default), long variable values in the response are truncated. When false, full variable values are returned.

---

### url

```ts
url: "/variables/search";
```

Defined in: [gen/types.gen.ts:16547](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L16547)
