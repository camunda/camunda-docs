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

Defined in: [gen/types.gen.ts:16143](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L16143)

## Properties

### body?

```ts
optional body: SearchQueryRequest & object;
```

Defined in: [gen/types.gen.ts:16147](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L16147)

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

Defined in: [gen/types.gen.ts:16163](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L16163)

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

Defined in: [gen/types.gen.ts:16169](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L16169)

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

Defined in: [gen/types.gen.ts:16175](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L16175)
