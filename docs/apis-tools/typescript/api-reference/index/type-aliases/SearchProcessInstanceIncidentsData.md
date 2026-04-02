---
title: "Type Alias: SearchProcessInstanceIncidentsData"
sidebar_label: "SearchProcessInstanceIncidentsData"
mdx:
  format: md
---

# Type Alias: SearchProcessInstanceIncidentsData

```ts
type SearchProcessInstanceIncidentsData = object;
```

Defined in: [gen/types.gen.ts:13468](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L13468)

## Properties

### body?

```ts
optional body?: IncidentSearchQuery;
```

Defined in: [gen/types.gen.ts:13469](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L13469)

---

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:13470](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L13470)

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

Defined in: [gen/types.gen.ts:13476](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L13476)

---

### url

```ts
url: "/process-instances/{processInstanceKey}/incidents/search";
```

Defined in: [gen/types.gen.ts:13477](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L13477)
