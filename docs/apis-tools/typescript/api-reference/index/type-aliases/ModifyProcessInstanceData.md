---
title: "Type Alias: ModifyProcessInstanceData"
sidebar_label: "ModifyProcessInstanceData"
mdx:
  format: md
---

# Type Alias: ModifyProcessInstanceData

```ts
type ModifyProcessInstanceData = object;
```

Defined in: [gen/types.gen.ts:14225](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L14225)

## Properties

### body

```ts
body: object;
```

Defined in: [gen/types.gen.ts:14226](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L14226)

#### activateInstructions?

```ts
optional activateInstructions: ProcessInstanceModificationActivateInstruction[];
```

Instructions describing which elements to activate in which scopes and which variables to create or update.

#### moveInstructions?

```ts
optional moveInstructions: ProcessInstanceModificationMoveInstruction[];
```

Instructions describing which elements to move from one scope to another.

#### operationReference?

```ts
optional operationReference: OperationReference;
```

#### terminateInstructions?

```ts
optional terminateInstructions: ProcessInstanceModificationTerminateInstruction[];
```

Instructions describing which elements to terminate.

---

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:14241](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L14241)

#### processInstanceKey

```ts
processInstanceKey: ProcessInstanceKey;
```

The key of the process instance that should be modified.

---

### query?

```ts
optional query: never;
```

Defined in: [gen/types.gen.ts:14247](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L14247)

---

### url

```ts
url: "/process-instances/{processInstanceKey}/modification";
```

Defined in: [gen/types.gen.ts:14248](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L14248)
