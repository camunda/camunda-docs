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

The migration instructions describe how to migrate a process instance from one process definition to another.

## Properties

### mappingInstructions

```ts
mappingInstructions: MigrateProcessInstanceMappingInstruction[];
```

The mapping instructions.

---

### targetProcessDefinitionKey

```ts
targetProcessDefinitionKey: ProcessDefinitionKey;
```

The target process definition key.
