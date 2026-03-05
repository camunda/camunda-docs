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

Defined in: [gen/types.gen.ts:5925](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5925)

The migration instructions describe how to migrate a process instance from one process definition to another.

## Properties

### mappingInstructions

```ts
mappingInstructions: MigrateProcessInstanceMappingInstruction[];
```

Defined in: [gen/types.gen.ts:5933](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5933)

Element mappings from the source process instance to the target process instance.

---

### operationReference?

```ts
optional operationReference: OperationReference;
```

Defined in: [gen/types.gen.ts:5934](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5934)

---

### targetProcessDefinitionKey

```ts
targetProcessDefinitionKey: ProcessDefinitionKey;
```

Defined in: [gen/types.gen.ts:5929](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5929)

The key of process definition to migrate the process instance to.
