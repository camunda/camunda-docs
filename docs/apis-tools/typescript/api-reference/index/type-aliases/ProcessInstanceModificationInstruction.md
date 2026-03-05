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

Defined in: [gen/types.gen.ts:5952](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5952)

## Properties

### activateInstructions?

```ts
optional activateInstructions: ProcessInstanceModificationActivateInstruction[];
```

Defined in: [gen/types.gen.ts:5957](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5957)

Instructions describing which elements to activate in which scopes and which variables to create or update.

---

### moveInstructions?

```ts
optional moveInstructions: ProcessInstanceModificationMoveInstruction[];
```

Defined in: [gen/types.gen.ts:5961](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5961)

Instructions describing which elements to move from one scope to another.

---

### operationReference?

```ts
optional operationReference: OperationReference;
```

Defined in: [gen/types.gen.ts:5953](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5953)

---

### terminateInstructions?

```ts
optional terminateInstructions: ProcessInstanceModificationTerminateInstruction[];
```

Defined in: [gen/types.gen.ts:5965](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5965)

Instructions describing which elements to terminate.
