---
title: "Type Alias: SearchUserTaskEffectiveVariablesData"
sidebar_label: "SearchUserTaskEffectiveVariablesData"
mdx:
  format: md
---

# Type Alias: SearchUserTaskEffectiveVariablesData

```ts
type SearchUserTaskEffectiveVariablesData = object;
```

Defined in: [gen/types.gen.ts:16351](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L16351)

## Properties

### body?

```ts
optional body?: object;
```

Defined in: [gen/types.gen.ts:16356](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L16356)

User task effective variable search query request. Uses offset-based pagination only.

#### filter?

```ts
optional filter?: UserTaskVariableFilter;
```

The user task variable search filters.

#### page?

```ts
optional page?: OffsetPagination;
```

Pagination parameters.

#### sort?

```ts
optional sort?: object[];
```

Sort field criteria.

---

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:16376](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L16376)

#### userTaskKey

```ts
userTaskKey: UserTaskKey;
```

The key of the user task.

---

### query?

```ts
optional query?: object;
```

Defined in: [gen/types.gen.ts:16382](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L16382)

#### truncateValues?

```ts
optional truncateValues?: boolean;
```

When true (default), long variable values in the response are truncated. When false, full variable values are returned.

---

### url

```ts
url: "/user-tasks/{userTaskKey}/effective-variables/search";
```

Defined in: [gen/types.gen.ts:16388](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L16388)
