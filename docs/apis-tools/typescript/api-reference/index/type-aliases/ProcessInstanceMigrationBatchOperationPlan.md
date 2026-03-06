---
title: "Type Alias: ProcessInstanceMigrationBatchOperationPlan"
sidebar_label: "ProcessInstanceMigrationBatchOperationPlan"
mdx:
  format: md
---

# Type Alias: ProcessInstanceMigrationBatchOperationPlan

```ts
type ProcessInstanceMigrationBatchOperationPlan = object;
```

Defined in: [gen/types.gen.ts:983](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L983)

The migration instructions describe how to migrate a process instance from one process definition to another.

## Properties

### mappingInstructions

```ts
mappingInstructions: MigrateProcessInstanceMappingInstruction[];
```

Defined in: [gen/types.gen.ts:991](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L991)

The mapping instructions.

***

### targetProcessDefinitionKey

```ts
targetProcessDefinitionKey: ProcessDefinitionKey;
```

Defined in: [gen/types.gen.ts:987](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L987)

The target process definition key.
