---
title: "Type Alias: JobErrorStatisticsFilter"
sidebar_label: "JobErrorStatisticsFilter"
mdx:
  format: md
---

# Type Alias: JobErrorStatisticsFilter

```ts
type JobErrorStatisticsFilter = object;
```

Defined in: [gen/types.gen.ts:3906](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3906)

Job error statistics search filter.

## Properties

### errorCode?

```ts
optional errorCode?: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:3924](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3924)

Optional error code filter with advanced search capabilities.

---

### errorMessage?

```ts
optional errorMessage?: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:3928](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3928)

Optional error message filter with advanced search capabilities.

---

### from

```ts
from: string;
```

Defined in: [gen/types.gen.ts:3911](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3911)

Start of the time window to filter metrics. ISO 8601 date-time format.

---

### jobType

```ts
jobType: string;
```

Defined in: [gen/types.gen.ts:3920](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3920)

Job type to return error metrics for.

---

### to

```ts
to: string;
```

Defined in: [gen/types.gen.ts:3916](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3916)

End of the time window to filter metrics. ISO 8601 date-time format.
