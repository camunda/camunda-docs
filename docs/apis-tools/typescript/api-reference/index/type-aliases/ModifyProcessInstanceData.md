---
title: "Type Alias: ModifyProcessInstanceData"
sidebar_label: "ModifyProcessInstanceData"
mdx:
  format: md
---

# Type Alias: ModifyProcessInstanceData

```ts
type ModifyProcessInstanceData = object;
```

Defined in: [gen/types.gen.ts:13357](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L13357)

## Properties

### body

```ts
body: ProcessInstanceModificationInstruction;
```

Defined in: [gen/types.gen.ts:13358](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L13358)

***

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:13359](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L13359)

#### processInstanceKey

```ts
processInstanceKey: ProcessInstanceKey;
```

The key of the process instance that should be modified.

***

### query?

```ts
optional query: never;
```

Defined in: [gen/types.gen.ts:13365](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L13365)

***

### url

```ts
url: "/process-instances/{processInstanceKey}/modification";
```

Defined in: [gen/types.gen.ts:13366](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L13366)
