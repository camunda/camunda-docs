---
title: "Type Alias: ProcessInstanceModificationBatchOperationRequest"
sidebar_label: "ProcessInstanceModificationBatchOperationRequest"
mdx:
  format: md
---

# Type Alias: ProcessInstanceModificationBatchOperationRequest

```ts
type ProcessInstanceModificationBatchOperationRequest = object;
```

Defined in: [gen/types.gen.ts:966](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L966)

The process instance filter to define on which process instances tokens should be moved,
and new element instances should be activated or terminated.

## Properties

### filter

```ts
filter: ProcessInstanceFilter;
```

Defined in: [gen/types.gen.ts:970](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L970)

The process instance filter.

---

### moveInstructions

```ts
moveInstructions: ProcessInstanceModificationMoveBatchOperationInstruction[];
```

Defined in: [gen/types.gen.ts:974](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L974)

Instructions for moving tokens between elements.

---

### operationReference?

```ts
optional operationReference: OperationReference;
```

Defined in: [gen/types.gen.ts:975](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L975)
