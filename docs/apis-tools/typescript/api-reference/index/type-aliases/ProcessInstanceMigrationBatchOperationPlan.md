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

Defined in: [gen/types.gen.ts:981](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L981)

The migration instructions describe how to migrate a process instance from one process definition to another.

## Properties

### mappingInstructions

```ts
mappingInstructions: MigrateProcessInstanceMappingInstruction[];
```

Defined in: [gen/types.gen.ts:989](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L989)

The mapping instructions.

---

### targetProcessDefinitionKey

```ts
targetProcessDefinitionKey: ProcessDefinitionKey;
```

Defined in: [gen/types.gen.ts:985](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L985)

The target process definition key.
