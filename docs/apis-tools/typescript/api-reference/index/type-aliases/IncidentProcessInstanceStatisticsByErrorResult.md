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

Defined in: [gen/types.gen.ts:3601](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3601)

## Properties

### activeInstancesWithErrorCount

```ts
activeInstancesWithErrorCount: number;
```

Defined in: [gen/types.gen.ts:3614](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3614)

The number of active process instances that currently have an active incident with this error.

---

### errorHashCode

```ts
errorHashCode: number;
```

Defined in: [gen/types.gen.ts:3605](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3605)

The hash code identifying a specific incident error..

---

### errorMessage

```ts
errorMessage: string;
```

Defined in: [gen/types.gen.ts:3609](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3609)

The error message associated with the incident error hash code.
