---
title: "Type Alias: GetProcessInstanceStatisticsData"
sidebar_label: "GetProcessInstanceStatisticsData"
mdx:
  format: md
---

# Type Alias: GetProcessInstanceStatisticsData

```ts
type GetProcessInstanceStatisticsData = object;
```

Defined in: [gen/types.gen.ts:13647](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L13647)

## Properties

### body?

```ts
optional body?: never;
```

Defined in: [gen/types.gen.ts:13648](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L13648)

---

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:13649](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L13649)

#### processInstanceKey

```ts
processInstanceKey: ProcessInstanceKey;
```

The assigned key of the process instance, which acts as a unique identifier for this process instance.

---

### query?

```ts
optional query?: never;
```

Defined in: [gen/types.gen.ts:13655](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L13655)

---

### url

```ts
url: "/process-instances/{processInstanceKey}/statistics/element-instances";
```

Defined in: [gen/types.gen.ts:13656](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L13656)
