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

Defined in: [gen/types.gen.ts:16380](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L16380)

## Properties

### body?

```ts
optional body: SearchQueryRequest & object;
```

Defined in: [gen/types.gen.ts:16384](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L16384)

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

Defined in: [gen/types.gen.ts:16400](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L16400)

***

### query?

```ts
optional query: object;
```

Defined in: [gen/types.gen.ts:16401](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L16401)

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

Defined in: [gen/types.gen.ts:16407](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L16407)
