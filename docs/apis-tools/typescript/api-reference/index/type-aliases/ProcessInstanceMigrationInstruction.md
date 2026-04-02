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

Defined in: [gen/types.gen.ts:6638](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L6638)

The migration instructions describe how to migrate a process instance from one process definition to another.

## Properties

### mappingInstructions

```ts
mappingInstructions: MigrateProcessInstanceMappingInstruction[];
```

Defined in: [gen/types.gen.ts:6646](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L6646)

Element mappings from the source process instance to the target process instance.

---

### operationReference?

```ts
optional operationReference?: OperationReference;
```

Defined in: [gen/types.gen.ts:6647](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L6647)

---

### targetProcessDefinitionKey

```ts
targetProcessDefinitionKey: ProcessDefinitionKey;
```

Defined in: [gen/types.gen.ts:6642](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L6642)

The key of process definition to migrate the process instance to.
