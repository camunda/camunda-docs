---
title: "Type Alias: ProcessInstanceModificationInstruction"
sidebar_label: "ProcessInstanceModificationInstruction"
mdx:
  format: md
---

# Type Alias: ProcessInstanceModificationInstruction

```ts
type ProcessInstanceModificationInstruction = object;
```

Defined in: [gen/types.gen.ts:6654](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L6654)

## Properties

### activateInstructions?

```ts
optional activateInstructions: ProcessInstanceModificationActivateInstruction[];
```

Defined in: [gen/types.gen.ts:6659](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L6659)

Instructions describing which elements to activate in which scopes and which variables to create or update.

***

### moveInstructions?

```ts
optional moveInstructions: ProcessInstanceModificationMoveInstruction[];
```

Defined in: [gen/types.gen.ts:6663](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L6663)

Instructions describing which elements to move from one scope to another.

***

### operationReference?

```ts
optional operationReference: OperationReference;
```

Defined in: [gen/types.gen.ts:6655](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L6655)

***

### terminateInstructions?

```ts
optional terminateInstructions: ProcessInstanceModificationTerminateInstruction[];
```

Defined in: [gen/types.gen.ts:6667](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L6667)

Instructions describing which elements to terminate.
