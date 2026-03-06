---
title: "Type Alias: BatchOperationItemResponse"
sidebar_label: "BatchOperationItemResponse"
mdx:
  format: md
---

# Type Alias: BatchOperationItemResponse

```ts
type BatchOperationItemResponse = object;
```

Defined in: [gen/types.gen.ts:888](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L888)

## Properties

### batchOperationKey?

```ts
optional batchOperationKey: BatchOperationKey;
```

Defined in: [gen/types.gen.ts:893](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L893)

The key (or operate legacy ID) of the batch operation.

***

### errorMessage?

```ts
optional errorMessage: string | null;
```

Defined in: [gen/types.gen.ts:920](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L920)

the error message from the engine in case of a failed operation.

***

### itemKey?

```ts
optional itemKey: string;
```

Defined in: [gen/types.gen.ts:897](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L897)

Key of the item, e.g. a process instance key.

***

### operationType?

```ts
optional operationType: BatchOperationTypeEnum;
```

Defined in: [gen/types.gen.ts:889](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L889)

***

### processedDate?

```ts
optional processedDate: string;
```

Defined in: [gen/types.gen.ts:916](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L916)

the date this item was processed.

***

### processInstanceKey?

```ts
optional processInstanceKey: ProcessInstanceKey;
```

Defined in: [gen/types.gen.ts:901](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L901)

the process instance key of the processed item.

***

### rootProcessInstanceKey

```ts
rootProcessInstanceKey: ProcessInstanceKey | null;
```

Defined in: [gen/types.gen.ts:908](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L908)

The key of the root process instance. The root process instance is the top-level
ancestor in the process instance hierarchy. This field is only present for data
belonging to process instance hierarchies created in version 8.9 or later.

***

### state?

```ts
optional state: "ACTIVE" | "COMPLETED" | "SKIPPED" | "CANCELED" | "FAILED";
```

Defined in: [gen/types.gen.ts:912](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L912)

State of the item.
