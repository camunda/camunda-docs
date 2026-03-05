---
title: "Type Alias: GetProcessInstanceStatisticsData"
sidebar_label: "GetProcessInstanceStatisticsData"
mdx:
  format: md
---

# Type Alias: GetProcessInstanceStatisticsData

```ts
type GetProcessInstanceStatisticsData = object;
```

Defined in: [gen/types.gen.ts:13442](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L13442)

## Properties

### body?

```ts
optional body: never;
```

Defined in: [gen/types.gen.ts:13443](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L13443)

***

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:13444](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L13444)

#### processInstanceKey

```ts
processInstanceKey: ProcessInstanceKey;
```

The assigned key of the process instance, which acts as a unique identifier for this process instance.

***

### query?

```ts
optional query: never;
```

Defined in: [gen/types.gen.ts:13450](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L13450)

***

### url

```ts
url: "/process-instances/{processInstanceKey}/statistics/element-instances";
```

Defined in: [gen/types.gen.ts:13451](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L13451)
