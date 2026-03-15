---
title: "Type Alias: SearchUserTaskVariablesData"
sidebar_label: "SearchUserTaskVariablesData"
mdx:
  format: md
---

# Type Alias: SearchUserTaskVariablesData

```ts
type SearchUserTaskVariablesData = object;
```

Defined in: [gen/types.gen.ts:16323](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L16323)

## Properties

### body?

```ts
optional body: SearchQueryRequest & object;
```

Defined in: [gen/types.gen.ts:16327](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L16327)

User task search query request.

#### Type Declaration

##### filter?

```ts
optional filter: UserTaskVariableFilter;
```

The user task variable search filters.

##### sort?

```ts
optional sort: object[];
```

Sort field criteria.

***

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:16343](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L16343)

#### userTaskKey

```ts
userTaskKey: UserTaskKey;
```

The key of the user task.

***

### query?

```ts
optional query: object;
```

Defined in: [gen/types.gen.ts:16349](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L16349)

#### truncateValues?

```ts
optional truncateValues: boolean;
```

When true (default), long variable values in the response are truncated. When false, full variable values are returned.

***

### url

```ts
url: "/user-tasks/{userTaskKey}/variables/search";
```

Defined in: [gen/types.gen.ts:16355](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L16355)
