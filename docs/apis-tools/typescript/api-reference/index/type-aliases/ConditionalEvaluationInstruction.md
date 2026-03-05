---
title: "Type Alias: ConditionalEvaluationInstruction"
sidebar_label: "ConditionalEvaluationInstruction"
mdx:
  format: md
---

# Type Alias: ConditionalEvaluationInstruction

```ts
type ConditionalEvaluationInstruction = object;
```

Defined in: [gen/types.gen.ts:1371](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1371)

## Properties

### processDefinitionKey?

```ts
optional processDefinitionKey: ProcessDefinitionKey;
```

Defined in: [gen/types.gen.ts:1382](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1382)

Used to evaluate root-level conditional start events of the process definition with the given key.

***

### tenantId?

```ts
optional tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:1377](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1377)

Used to evaluate root-level conditional start events for a tenant with the given ID.
This will only evaluate root-level conditional start events of process definitions which belong to the tenant.

***

### variables

```ts
variables: object;
```

Defined in: [gen/types.gen.ts:1387](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1387)

JSON object representing the variables to use for evaluation of the conditions and to pass to the process instances that have been triggered.

#### Index Signature

```ts
[key: string]: unknown
```
