---
title: "Type Alias: EvaluateConditionalResult"
sidebar_label: "EvaluateConditionalResult"
mdx:
  format: md
---

# Type Alias: EvaluateConditionalResult

```ts
type EvaluateConditionalResult = object;
```

Defined in: [gen/types.gen.ts:1392](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1392)

## Properties

### conditionalEvaluationKey

```ts
conditionalEvaluationKey: ConditionalEvaluationKey;
```

Defined in: [gen/types.gen.ts:1396](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1396)

The unique key of the conditional evaluation operation.

***

### processInstances

```ts
processInstances: ProcessInstanceReference[];
```

Defined in: [gen/types.gen.ts:1404](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1404)

List of process instances created. If no root-level conditional start events evaluated to true, the list will be empty.

***

### tenantId

```ts
tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:1400](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1400)

The tenant ID of the conditional evaluation operation.
