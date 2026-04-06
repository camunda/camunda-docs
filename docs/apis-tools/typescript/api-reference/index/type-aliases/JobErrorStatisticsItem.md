---
title: "Type Alias: JobErrorStatisticsItem"
sidebar_label: "JobErrorStatisticsItem"
mdx:
  format: md
---

# Type Alias: JobErrorStatisticsItem

```ts
type JobErrorStatisticsItem = object;
```

Defined in: [gen/types.gen.ts:3945](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3945)

Aggregated error metrics for a single error type and message combination.

## Properties

### errorCode

```ts
errorCode: string;
```

Defined in: [gen/types.gen.ts:3949](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3949)

The error code identifier.

---

### errorMessage

```ts
errorMessage: string;
```

Defined in: [gen/types.gen.ts:3953](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3953)

The error message.

---

### workers

```ts
workers: number;
```

Defined in: [gen/types.gen.ts:3957](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3957)

Number of distinct workers that encountered this error.
