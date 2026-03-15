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

Defined in: [gen/types.gen.ts:985](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L985)

The migration instructions describe how to migrate a process instance from one process definition to another.

## Properties

### mappingInstructions

```ts
mappingInstructions: MigrateProcessInstanceMappingInstruction[];
```

Defined in: [gen/types.gen.ts:993](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L993)

The mapping instructions.

***

### targetProcessDefinitionKey

```ts
targetProcessDefinitionKey: ProcessDefinitionKey;
```

Defined in: [gen/types.gen.ts:989](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L989)

The target process definition key.
