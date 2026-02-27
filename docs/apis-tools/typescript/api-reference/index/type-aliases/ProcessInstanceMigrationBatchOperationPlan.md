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

Defined in: [gen/types.gen.ts:950](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L950)

The migration instructions describe how to migrate a process instance from one process definition to another.

## Properties

### mappingInstructions

```ts
mappingInstructions: MigrateProcessInstanceMappingInstruction[];
```

Defined in: [gen/types.gen.ts:958](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L958)

The mapping instructions.

---

### targetProcessDefinitionKey

```ts
targetProcessDefinitionKey: ProcessDefinitionKey;
```

Defined in: [gen/types.gen.ts:954](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L954)

The target process definition key.
