---
title: "Type Alias: ModifyProcessInstancesBatchOperationData"
sidebar_label: "ModifyProcessInstancesBatchOperationData"
mdx:
  format: md
---

# Type Alias: ModifyProcessInstancesBatchOperationData

```ts
type ModifyProcessInstancesBatchOperationData = object;
```

Defined in: [gen/types.gen.ts:13570](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L13570)

## Properties

### body

```ts
body: object;
```

Defined in: [gen/types.gen.ts:13576](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L13576)

The process instance filter to define on which process instances tokens should be moved,
and new element instances should be activated or terminated.

#### filter

```ts
filter: ProcessInstanceFilter;
```

The process instance filter.

#### moveInstructions

```ts
moveInstructions: ProcessInstanceModificationMoveBatchOperationInstruction[];
```

Instructions for moving tokens between elements.

#### operationReference?

```ts
optional operationReference: OperationReference;
```

---

### path?

```ts
optional path: never;
```

Defined in: [gen/types.gen.ts:13587](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L13587)

---

### query?

```ts
optional query: never;
```

Defined in: [gen/types.gen.ts:13588](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L13588)

---

### url

```ts
url: "/process-instances/modification";
```

Defined in: [gen/types.gen.ts:13589](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L13589)
