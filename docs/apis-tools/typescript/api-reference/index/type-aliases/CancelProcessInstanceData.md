---
title: "Type Alias: CancelProcessInstanceData"
sidebar_label: "CancelProcessInstanceData"
mdx:
  format: md
---

# Type Alias: CancelProcessInstanceData

```ts
type CancelProcessInstanceData = object;
```

Defined in: [gen/types.gen.ts:13118](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L13118)

## Properties

### body?

```ts
optional body: 
  | {
  operationReference?: OperationReference;
}
  | null;
```

Defined in: [gen/types.gen.ts:13119](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L13119)

***

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:13122](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L13122)

#### processInstanceKey

```ts
processInstanceKey: ProcessInstanceKey;
```

The key of the process instance to cancel.

***

### query?

```ts
optional query: never;
```

Defined in: [gen/types.gen.ts:13128](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L13128)

***

### url

```ts
url: "/process-instances/{processInstanceKey}/cancellation";
```

Defined in: [gen/types.gen.ts:13129](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L13129)
