---
title: "Type Alias: ProcessInstanceCreationInstructionByKey"
sidebar_label: "ProcessInstanceCreationInstructionByKey"
mdx:
  format: md
---

# Type Alias: ProcessInstanceCreationInstructionByKey

```ts
type ProcessInstanceCreationInstructionByKey = object;
```

Defined in: [gen/types.gen.ts:6060](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6060)

Process creation by key

## Properties

### awaitCompletion?

```ts
optional awaitCompletion: boolean;
```

Defined in: [gen/types.gen.ts:6112](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6112)

Wait for the process instance to complete. If the process instance does not complete
within the request timeout limit, a 504 response status will be returned. The process
instance will continue to run in the background regardless of the timeout. Disabled by
default.

***

### businessId?

```ts
optional businessId: BusinessId;
```

Defined in: [gen/types.gen.ts:6126](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6126)

***

### fetchVariables?

```ts
optional fetchVariables: string[];
```

Defined in: [gen/types.gen.ts:6124](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6124)

List of variables by name to be included in the response when awaitCompletion is set to true.
If empty, all visible variables in the root scope will be returned.

***

### operationReference?

```ts
optional operationReference: OperationReference;
```

Defined in: [gen/types.gen.ts:6104](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6104)

***

### processDefinitionKey

```ts
processDefinitionKey: ProcessDefinitionKey;
```

Defined in: [gen/types.gen.ts:6066](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6066)

The unique key identifying the process definition, for example, returned for a process in the
deploy resources endpoint.

***

### processDefinitionVersion?

```ts
optional processDefinitionVersion: number;
```

Defined in: [gen/types.gen.ts:6072](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6072)

As the version is already identified by the `processDefinitionKey`, the value of this field is ignored.
It's here for backwards-compatibility only as previous releases accepted it in request bodies.

***

### requestTimeout?

```ts
optional requestTimeout: number;
```

Defined in: [gen/types.gen.ts:6118](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6118)

Timeout (in ms) the request waits for the process to complete. By default or
when set to 0, the generic request timeout configured in the cluster is applied.

***

### runtimeInstructions?

```ts
optional runtimeInstructions: ProcessInstanceCreationRuntimeInstruction[];
```

Defined in: [gen/types.gen.ts:6096](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6096)

Runtime instructions (alpha). List of instructions that affect the runtime behavior of
the process instance. Refer to specific instruction types for more details.

This parameter is an alpha feature and may be subject to change
in future releases.

***

### startInstructions?

```ts
optional startInstructions: ProcessInstanceCreationStartInstruction[];
```

Defined in: [gen/types.gen.ts:6087](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6087)

List of start instructions. By default, the process instance will start at
the start event. If provided, the process instance will apply start instructions
after it has been created.

***

### tags?

```ts
optional tags: TagSet;
```

Defined in: [gen/types.gen.ts:6125](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6125)

***

### tenantId?

```ts
optional tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:6103](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6103)

The tenant id of the process definition.
If multi-tenancy is enabled, provide the tenant id of the process definition to start a
process instance of. If multi-tenancy is disabled, don't provide this parameter.

***

### variables?

```ts
optional variables: object;
```

Defined in: [gen/types.gen.ts:6078](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6078)

Set of variables as JSON object to instantiate in the root variable scope of the process
instance. Can include nested complex objects.

#### Index Signature

```ts
[key: string]: unknown
```
