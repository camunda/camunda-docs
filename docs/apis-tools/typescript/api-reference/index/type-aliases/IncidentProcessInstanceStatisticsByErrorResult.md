---
title: "Type Alias: IncidentProcessInstanceStatisticsByErrorResult"
sidebar_label: "IncidentProcessInstanceStatisticsByErrorResult"
mdx:
  format: md
---

# Type Alias: IncidentProcessInstanceStatisticsByErrorResult

```ts
type IncidentProcessInstanceStatisticsByErrorResult = object;
```

Defined in: [gen/types.gen.ts:3598](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L3598)

## Properties

### activeInstancesWithErrorCount?

```ts
optional activeInstancesWithErrorCount: number;
```

Defined in: [gen/types.gen.ts:3611](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L3611)

The number of active process instances that currently have an active incident with this error.

***

### errorHashCode?

```ts
optional errorHashCode: number;
```

Defined in: [gen/types.gen.ts:3602](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L3602)

The hash code identifying a specific incident error..

***

### errorMessage?

```ts
optional errorMessage: string;
```

Defined in: [gen/types.gen.ts:3606](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L3606)

The error message associated with the incident error hash code.
