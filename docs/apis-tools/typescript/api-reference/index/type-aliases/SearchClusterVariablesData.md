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

Defined in: [gen/types.gen.ts:9139](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L9139)

## Properties

### body?

```ts
optional body: ClusterVariableSearchQueryRequest;
```

Defined in: [gen/types.gen.ts:9140](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L9140)

***

### path?

```ts
optional path: never;
```

Defined in: [gen/types.gen.ts:9141](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L9141)

***

### query?

```ts
optional query: object;
```

Defined in: [gen/types.gen.ts:9142](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L9142)

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

Defined in: [gen/types.gen.ts:9148](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L9148)
