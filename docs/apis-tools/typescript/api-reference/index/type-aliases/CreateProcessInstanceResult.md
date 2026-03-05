---
title: "Type Alias: CreateProcessInstanceResult"
sidebar_label: "CreateProcessInstanceResult"
mdx:
  format: md
---

# Type Alias: CreateProcessInstanceResult

```ts
type CreateProcessInstanceResult = object;
```

Defined in: [gen/types.gen.ts:6161](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6161)

## Properties

### businessId?

```ts
optional businessId: BusinessId | null;
```

Defined in: [gen/types.gen.ts:6198](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6198)

Business id as provided on creation.

***

### processDefinitionId

```ts
processDefinitionId: ProcessDefinitionId;
```

Defined in: [gen/types.gen.ts:6167](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6167)

The BPMN process id of the process definition which was used to create the process.
instance

***

### processDefinitionKey

```ts
processDefinitionKey: ProcessDefinitionKey;
```

Defined in: [gen/types.gen.ts:6187](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6187)

The key of the process definition which was used to create the process instance.

***

### processDefinitionVersion

```ts
processDefinitionVersion: number;
```

Defined in: [gen/types.gen.ts:6172](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6172)

The version of the process definition which was used to create the process instance.

***

### processInstanceKey

```ts
processInstanceKey: ProcessInstanceKey;
```

Defined in: [gen/types.gen.ts:6193](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6193)

The unique identifier of the created process instance; to be used wherever a request
needs a process instance key (e.g. CancelProcessInstanceRequest).

***

### tags

```ts
tags: TagSet;
```

Defined in: [gen/types.gen.ts:6194](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6194)

***

### tenantId

```ts
tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:6176](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6176)

The tenant id of the created process instance.

***

### variables

```ts
variables: object;
```

Defined in: [gen/types.gen.ts:6180](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6180)

All the variables visible in the root scope.

#### Index Signature

```ts
[key: string]: unknown
```
