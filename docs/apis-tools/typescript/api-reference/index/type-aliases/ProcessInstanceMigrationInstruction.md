---
title: "Type Alias: ProcessInstanceMigrationInstruction"
sidebar_label: "ProcessInstanceMigrationInstruction"
mdx:
  format: md
---

# Type Alias: ProcessInstanceMigrationInstruction

```ts
type ProcessInstanceMigrationInstruction = object;
```

Defined in: [gen/types.gen.ts:6552](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6552)

The migration instructions describe how to migrate a process instance from one process definition to another.

## Properties

### mappingInstructions

```ts
mappingInstructions: MigrateProcessInstanceMappingInstruction[];
```

Defined in: [gen/types.gen.ts:6560](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6560)

Element mappings from the source process instance to the target process instance.

***

### operationReference?

```ts
optional operationReference: OperationReference;
```

Defined in: [gen/types.gen.ts:6561](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6561)

***

### targetProcessDefinitionKey

```ts
targetProcessDefinitionKey: ProcessDefinitionKey;
```

Defined in: [gen/types.gen.ts:6556](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6556)

The key of process definition to migrate the process instance to.
