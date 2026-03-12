---
title: "Type Alias: ProcessInstanceIncidentResolutionBatchOperationRequest"
sidebar_label: "ProcessInstanceIncidentResolutionBatchOperationRequest"
mdx:
  format: md
---

# Type Alias: ProcessInstanceIncidentResolutionBatchOperationRequest

```ts
type ProcessInstanceIncidentResolutionBatchOperationRequest = object;
```

Defined in: [gen/types.gen.ts:950](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L950)

The process instance filter that defines which process instances should have their incidents resolved.

## Properties

### filter

```ts
filter: ProcessInstanceFilter;
```

Defined in: [gen/types.gen.ts:954](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L954)

The process instance filter.

***

### operationReference?

```ts
optional operationReference: OperationReference;
```

Defined in: [gen/types.gen.ts:955](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L955)
