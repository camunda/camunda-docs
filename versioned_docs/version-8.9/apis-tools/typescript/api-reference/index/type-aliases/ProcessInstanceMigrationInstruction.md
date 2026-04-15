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

The migration instructions describe how to migrate a process instance from one process definition to another.

## Properties

### mappingInstructions

```ts
mappingInstructions: MigrateProcessInstanceMappingInstruction[];
```

Element mappings from the source process instance to the target process instance.

---

### operationReference?

```ts
optional operationReference?: OperationReference;
```

---

### targetProcessDefinitionKey

```ts
targetProcessDefinitionKey: ProcessDefinitionKey;
```

The key of process definition to migrate the process instance to.
