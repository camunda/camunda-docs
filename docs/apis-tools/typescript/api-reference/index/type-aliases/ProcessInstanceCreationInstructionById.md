---
title: "Type Alias: ProcessInstanceCreationInstructionById"
sidebar_label: "ProcessInstanceCreationInstructionById"
mdx:
  format: md
---

# Type Alias: ProcessInstanceCreationInstructionById

```ts
type ProcessInstanceCreationInstructionById = object;
```

Defined in: [gen/types.gen.ts:5990](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5990)

Process creation by id

## Properties

### awaitCompletion?

```ts
optional awaitCompletion: boolean;
```

Defined in: [gen/types.gen.ts:6040](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6040)

Wait for the process instance to complete. If the process instance does not complete
within the request timeout limit, a 504 response status will be returned. The process
instance will continue to run in the background regardless of the timeout. Disabled by
default.

***

### businessId?

```ts
optional businessId: BusinessId;
```

Defined in: [gen/types.gen.ts:6054](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6054)

***

### fetchVariables?

```ts
optional fetchVariables: string[];
```

Defined in: [gen/types.gen.ts:6046](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6046)

List of variables by name to be included in the response when awaitCompletion is set to true.
If empty, all visible variables in the root scope will be returned.

***

### operationReference?

```ts
optional operationReference: OperationReference;
```

Defined in: [gen/types.gen.ts:6016](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6016)

***

### processDefinitionId

```ts
processDefinitionId: ProcessDefinitionId;
```

Defined in: [gen/types.gen.ts:5995](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5995)

The BPMN process id of the process definition to start an instance of.

***

### processDefinitionVersion?

```ts
optional processDefinitionVersion: number;
```

Defined in: [gen/types.gen.ts:6000](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6000)

The version of the process. By default, the latest version of the process is used.

***

### requestTimeout?

```ts
optional requestTimeout: number;
```

Defined in: [gen/types.gen.ts:6052](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6052)

Timeout (in ms) the request waits for the process to complete. By default or
when set to 0, the generic request timeout configured in the cluster is applied.

***

### runtimeInstructions?

```ts
optional runtimeInstructions: ProcessInstanceCreationRuntimeInstruction[];
```

Defined in: [gen/types.gen.ts:6032](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6032)

Runtime instructions (alpha). List of instructions that affect the runtime behavior of
the process instance. Refer to specific instruction types for more details.

This parameter is an alpha feature and may be subject to change
in future releases.

***

### startInstructions?

```ts
optional startInstructions: ProcessInstanceCreationStartInstruction[];
```

Defined in: [gen/types.gen.ts:6023](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6023)

List of start instructions. By default, the process instance will start at
the start event. If provided, the process instance will apply start instructions
after it has been created.

***

### tags?

```ts
optional tags: TagSet;
```

Defined in: [gen/types.gen.ts:6053](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6053)

***

### tenantId?

```ts
optional tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:6015](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6015)

The tenant id of the process definition.
If multi-tenancy is enabled, provide the tenant id of the process definition to start a
process instance of. If multi-tenancy is disabled, don't provide this parameter.

***

### variables?

```ts
optional variables: object;
```

Defined in: [gen/types.gen.ts:6006](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6006)

JSON object that will instantiate the variables for the root variable scope
of the process instance.

#### Index Signature

```ts
[key: string]: unknown
```
