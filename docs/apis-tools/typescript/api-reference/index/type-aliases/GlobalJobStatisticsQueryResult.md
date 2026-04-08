---
title: "Type Alias: GlobalJobStatisticsQueryResult"
sidebar_label: "GlobalJobStatisticsQueryResult"
mdx:
  format: md
---

# Type Alias: GlobalJobStatisticsQueryResult

```ts
type GlobalJobStatisticsQueryResult = object;
```

Defined in: [gen/types.gen.ts:3691](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3691)

Global job statistics query result.

## Properties

### completed

```ts
completed: StatusMetric;
```

Defined in: [gen/types.gen.ts:3693](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3693)

---

### created

```ts
created: StatusMetric;
```

Defined in: [gen/types.gen.ts:3692](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3692)

---

### failed

```ts
failed: StatusMetric;
```

Defined in: [gen/types.gen.ts:3694](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3694)

---

### isIncomplete

```ts
isIncomplete: boolean;
```

Defined in: [gen/types.gen.ts:3698](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3698)

True if some data is missing because internal limits were reached and some metrics were not recorded.
