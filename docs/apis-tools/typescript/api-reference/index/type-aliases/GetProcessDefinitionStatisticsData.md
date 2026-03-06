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

Defined in: [gen/types.gen.ts:12625](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L12625)

## Properties

### body?

```ts
optional body: ProcessDefinitionElementStatisticsQuery;
```

Defined in: [gen/types.gen.ts:12626](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L12626)

***

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:12627](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L12627)

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

Defined in: [gen/types.gen.ts:12633](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L12633)

***

### url

```ts
url: "/process-definitions/{processDefinitionKey}/statistics/element-instances";
```

Defined in: [gen/types.gen.ts:12634](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L12634)
