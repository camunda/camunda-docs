---
title: "Type Alias: GetProcessInstanceCallHierarchyData"
sidebar_label: "GetProcessInstanceCallHierarchyData"
mdx:
  format: md
---

# Type Alias: GetProcessInstanceCallHierarchyData

```ts
type GetProcessInstanceCallHierarchyData = object;
```

Defined in: [gen/types.gen.ts:13072](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L13072)

## Properties

### body?

```ts
optional body: never;
```

Defined in: [gen/types.gen.ts:13073](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L13073)

***

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:13074](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L13074)

#### processInstanceKey

```ts
processInstanceKey: ProcessInstanceKey;
```

The key of the process instance to fetch the hierarchy for.

***

### query?

```ts
optional query: never;
```

Defined in: [gen/types.gen.ts:13080](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L13080)

***

### url

```ts
url: "/process-instances/{processInstanceKey}/call-hierarchy";
```

Defined in: [gen/types.gen.ts:13081](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L13081)
