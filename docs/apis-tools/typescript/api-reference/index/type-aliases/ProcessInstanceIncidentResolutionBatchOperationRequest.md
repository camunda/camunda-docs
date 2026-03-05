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

Defined in: [gen/types.gen.ts:948](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L948)

The process instance filter that defines which process instances should have their incidents resolved.

## Properties

### filter

```ts
filter: ProcessInstanceFilter;
```

Defined in: [gen/types.gen.ts:952](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L952)

The process instance filter.

***

### operationReference?

```ts
optional operationReference: OperationReference;
```

Defined in: [gen/types.gen.ts:953](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L953)
