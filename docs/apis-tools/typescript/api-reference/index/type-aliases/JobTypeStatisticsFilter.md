---
title: "Type Alias: JobTypeStatisticsFilter"
sidebar_label: "JobTypeStatisticsFilter"
mdx:
  format: md
---

# Type Alias: JobTypeStatisticsFilter

```ts
type JobTypeStatisticsFilter = object;
```

Defined in: [gen/types.gen.ts:3729](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3729)

Job type statistics search filter.

## Properties

### from

```ts
from: string;
```

Defined in: [gen/types.gen.ts:3734](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3734)

Start of the time window to filter metrics. ISO 8601 date-time format.

---

### jobType?

```ts
optional jobType?: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:3745](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3745)

Optional job type filter with advanced search capabilities.
Supports exact match, pattern matching, and other operators.

---

### to

```ts
to: string;
```

Defined in: [gen/types.gen.ts:3739](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3739)

End of the time window to filter metrics. ISO 8601 date-time format.
