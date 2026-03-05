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

Defined in: [gen/types.gen.ts:16200](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L16200)

## Properties

### body?

```ts
optional body: SearchQueryRequest & object;
```

Defined in: [gen/types.gen.ts:16204](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L16204)

Variable search query request.

#### Type Declaration

##### filter?

```ts
optional filter: VariableFilter;
```

The variable search filters.

##### sort?

```ts
optional sort: object[];
```

Sort field criteria.

***

### path?

```ts
optional path: never;
```

Defined in: [gen/types.gen.ts:16220](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L16220)

***

### query?

```ts
optional query: object;
```

Defined in: [gen/types.gen.ts:16221](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L16221)

#### truncateValues?

```ts
optional truncateValues: boolean;
```

When true (default), long variable values in the response are truncated. When false, full variable values are returned.

***

### url

```ts
url: "/variables/search";
```

Defined in: [gen/types.gen.ts:16227](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L16227)
