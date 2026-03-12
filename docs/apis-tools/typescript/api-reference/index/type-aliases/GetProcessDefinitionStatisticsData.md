---
title: "Type Alias: GetProcessDefinitionStatisticsData"
sidebar_label: "GetProcessDefinitionStatisticsData"
mdx:
  format: md
---

# Type Alias: GetProcessDefinitionStatisticsData

```ts
type GetProcessDefinitionStatisticsData = object;
```

Defined in: [gen/types.gen.ts:12776](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L12776)

## Properties

### body?

```ts
optional body: ProcessDefinitionElementStatisticsQuery;
```

Defined in: [gen/types.gen.ts:12777](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L12777)

***

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:12778](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L12778)

#### processDefinitionKey

```ts
processDefinitionKey: ProcessDefinitionKey;
```

The assigned key of the process definition, which acts as a unique identifier for this process definition.

***

### query?

```ts
optional query: never;
```

Defined in: [gen/types.gen.ts:12784](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L12784)

***

### url

```ts
url: "/process-definitions/{processDefinitionKey}/statistics/element-instances";
```

Defined in: [gen/types.gen.ts:12785](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L12785)
