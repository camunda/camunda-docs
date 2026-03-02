---
title: "Type Alias: MigrateProcessInstanceData"
sidebar_label: "MigrateProcessInstanceData"
mdx:
  format: md
---

# Type Alias: MigrateProcessInstanceData

```ts
type MigrateProcessInstanceData = object;
```

Defined in: [gen/types.gen.ts:14163](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L14163)

## Properties

### body

```ts
body: object;
```

Defined in: [gen/types.gen.ts:14168](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L14168)

The migration instructions describe how to migrate a process instance from one process definition to another.

#### mappingInstructions

```ts
mappingInstructions: MigrateProcessInstanceMappingInstruction[];
```

Element mappings from the source process instance to the target process instance.

#### operationReference?

```ts
optional operationReference: OperationReference;
```

#### targetProcessDefinitionKey

```ts
targetProcessDefinitionKey: ProcessDefinitionKey;
```

The key of process definition to migrate the process instance to.

---

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:14179](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L14179)

#### processInstanceKey

```ts
processInstanceKey: ProcessInstanceKey;
```

The key of the process instance that should be migrated.

---

### query?

```ts
optional query: never;
```

Defined in: [gen/types.gen.ts:14185](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L14185)

---

### url

```ts
url: "/process-instances/{processInstanceKey}/migration";
```

Defined in: [gen/types.gen.ts:14186](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L14186)
