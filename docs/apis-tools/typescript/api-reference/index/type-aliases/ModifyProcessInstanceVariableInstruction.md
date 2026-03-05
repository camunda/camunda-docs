---
title: "Type Alias: ModifyProcessInstanceVariableInstruction"
sidebar_label: "ModifyProcessInstanceVariableInstruction"
mdx:
  format: md
---

# Type Alias: ModifyProcessInstanceVariableInstruction

```ts
type ModifyProcessInstanceVariableInstruction = object;
```

Defined in: [gen/types.gen.ts:6620](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6620)

Instruction describing which variables to create or update.

## Properties

### scopeId?

```ts
optional scopeId: string;
```

Defined in: [gen/types.gen.ts:6634](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6634)

The id of the element in which scope the variables should be created.
Leave empty to create the variables in the global scope of the process instance.

***

### variables

```ts
variables: object;
```

Defined in: [gen/types.gen.ts:6626](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6626)

JSON document that will instantiate the variables at the scope defined by the scopeId.
It must be a JSON object, as variables will be mapped in a key-value fashion.

#### Index Signature

```ts
[key: string]: unknown
```
