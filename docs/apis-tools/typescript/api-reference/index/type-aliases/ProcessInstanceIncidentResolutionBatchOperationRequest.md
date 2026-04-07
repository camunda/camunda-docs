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

Defined in: [gen/types.gen.ts:946](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L946)

The process instance filter that defines which process instances should have their incidents resolved.

## Properties

### filter

```ts
filter: ProcessInstanceFilter;
```

Defined in: [gen/types.gen.ts:950](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L950)

The process instance filter.

---

### operationReference?

```ts
optional operationReference?: OperationReference;
```

Defined in: [gen/types.gen.ts:951](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L951)
