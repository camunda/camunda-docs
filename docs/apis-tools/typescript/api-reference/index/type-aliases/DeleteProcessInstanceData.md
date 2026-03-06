---
title: "Type Alias: DeleteProcessInstanceData"
sidebar_label: "DeleteProcessInstanceData"
mdx:
  format: md
---

# Type Alias: DeleteProcessInstanceData

```ts
type DeleteProcessInstanceData = object;
```

Defined in: [gen/types.gen.ts:13163](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L13163)

## Properties

### body?

```ts
optional body: 
  | {
  operationReference?: OperationReference;
}
  | null;
```

Defined in: [gen/types.gen.ts:13164](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L13164)

***

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:13167](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L13167)

#### processInstanceKey

```ts
processInstanceKey: ProcessInstanceKey;
```

The key of the process instance to delete.

***

### query?

```ts
optional query: never;
```

Defined in: [gen/types.gen.ts:13173](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L13173)

***

### url

```ts
url: "/process-instances/{processInstanceKey}/deletion";
```

Defined in: [gen/types.gen.ts:13174](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L13174)
