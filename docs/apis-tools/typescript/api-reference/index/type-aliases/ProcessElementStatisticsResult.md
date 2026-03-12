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

Defined in: [gen/types.gen.ts:5859](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5859)

Process element statistics response.

## Properties

### active

```ts
active: number;
```

Defined in: [gen/types.gen.ts:5867](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5867)

The total number of active instances of the element.

***

### canceled

```ts
canceled: number;
```

Defined in: [gen/types.gen.ts:5871](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5871)

The total number of canceled instances of the element.

***

### completed

```ts
completed: number;
```

Defined in: [gen/types.gen.ts:5879](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5879)

The total number of completed instances of the element.

***

### elementId

```ts
elementId: ElementId;
```

Defined in: [gen/types.gen.ts:5863](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5863)

The element ID for which the results are aggregated.

***

### incidents

```ts
incidents: number;
```

Defined in: [gen/types.gen.ts:5875](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5875)

The total number of incidents for the element.
