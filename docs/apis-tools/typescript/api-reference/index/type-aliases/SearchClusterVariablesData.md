---
title: "Type Alias: SearchClusterVariablesData"
sidebar_label: "SearchClusterVariablesData"
mdx:
  format: md
---

# Type Alias: SearchClusterVariablesData

```ts
type SearchClusterVariablesData = object;
```

Defined in: [gen/types.gen.ts:9253](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L9253)

## Properties

### body?

```ts
optional body: ClusterVariableSearchQueryRequest;
```

Defined in: [gen/types.gen.ts:9254](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L9254)

***

### path?

```ts
optional path: never;
```

Defined in: [gen/types.gen.ts:9255](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L9255)

***

### query?

```ts
optional query: object;
```

Defined in: [gen/types.gen.ts:9256](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L9256)

#### truncateValues?

```ts
optional truncateValues: boolean;
```

When true (default), long variable values in the response are truncated. When false, full variable values are returned.

***

### url

```ts
url: "/cluster-variables/search";
```

Defined in: [gen/types.gen.ts:9262](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L9262)
