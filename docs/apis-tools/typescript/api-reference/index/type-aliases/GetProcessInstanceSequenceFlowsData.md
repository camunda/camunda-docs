---
title: "Type Alias: GetProcessInstanceSequenceFlowsData"
sidebar_label: "GetProcessInstanceSequenceFlowsData"
mdx:
  format: md
---

# Type Alias: GetProcessInstanceSequenceFlowsData

```ts
type GetProcessInstanceSequenceFlowsData = object;
```

Defined in: [gen/types.gen.ts:13400](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L13400)

## Properties

### body?

```ts
optional body: never;
```

Defined in: [gen/types.gen.ts:13401](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L13401)

***

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:13402](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L13402)

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

Defined in: [gen/types.gen.ts:13408](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L13408)

***

### url

```ts
url: "/process-instances/{processInstanceKey}/sequence-flows";
```

Defined in: [gen/types.gen.ts:13409](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L13409)
