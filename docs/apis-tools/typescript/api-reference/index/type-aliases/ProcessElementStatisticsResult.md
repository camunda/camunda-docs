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

Defined in: [gen/types.gen.ts:5862](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5862)

Process element statistics response.

## Properties

### active

```ts
active: number;
```

Defined in: [gen/types.gen.ts:5870](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5870)

The total number of active instances of the element.

---

### canceled

```ts
canceled: number;
```

Defined in: [gen/types.gen.ts:5874](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5874)

The total number of canceled instances of the element.

---

### completed

```ts
completed: number;
```

Defined in: [gen/types.gen.ts:5882](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5882)

The total number of completed instances of the element.

---

### elementId

```ts
elementId: ElementId;
```

Defined in: [gen/types.gen.ts:5866](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5866)

The element ID for which the results are aggregated.

---

### incidents

```ts
incidents: number;
```

Defined in: [gen/types.gen.ts:5878](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5878)

The total number of incidents for the element.
