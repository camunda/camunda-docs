---
title: "Type Alias: ProcessElementStatisticsResult"
sidebar_label: "ProcessElementStatisticsResult"
mdx:
  format: md
---

# Type Alias: ProcessElementStatisticsResult

```ts
type ProcessElementStatisticsResult = object;
```

Defined in: [gen/types.gen.ts:5788](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5788)

Process element statistics response.

## Properties

### active?

```ts
optional active: number;
```

Defined in: [gen/types.gen.ts:5796](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5796)

The total number of active instances of the element.

***

### canceled?

```ts
optional canceled: number;
```

Defined in: [gen/types.gen.ts:5800](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5800)

The total number of canceled instances of the element.

***

### completed?

```ts
optional completed: number;
```

Defined in: [gen/types.gen.ts:5808](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5808)

The total number of completed instances of the element.

***

### elementId?

```ts
optional elementId: ElementId;
```

Defined in: [gen/types.gen.ts:5792](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5792)

The element ID for which the results are aggregated.

***

### incidents?

```ts
optional incidents: number;
```

Defined in: [gen/types.gen.ts:5804](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5804)

The total number of incidents for the element.
