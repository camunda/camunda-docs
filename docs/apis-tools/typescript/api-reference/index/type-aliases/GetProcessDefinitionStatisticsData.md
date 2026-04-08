---
title: "Type Alias: GetProcessDefinitionStatisticsData"
sidebar_label: "GetProcessDefinitionStatisticsData"
mdx:
  format: md
---

# Type Alias: GetProcessDefinitionStatisticsData

```ts
type GetProcessDefinitionStatisticsData = object;
```

Defined in: [gen/types.gen.ts:12816](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L12816)

## Properties

### body?

```ts
optional body?: ProcessDefinitionElementStatisticsQuery;
```

Defined in: [gen/types.gen.ts:12817](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L12817)

---

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:12818](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L12818)

#### processDefinitionKey

```ts
processDefinitionKey: ProcessDefinitionKey;
```

The assigned key of the process definition, which acts as a unique identifier for this process definition.

---

### query?

```ts
optional query?: never;
```

Defined in: [gen/types.gen.ts:12824](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L12824)

---

### url

```ts
url: "/process-definitions/{processDefinitionKey}/statistics/element-instances";
```

Defined in: [gen/types.gen.ts:12825](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L12825)
