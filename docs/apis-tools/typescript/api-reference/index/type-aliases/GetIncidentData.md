---
title: "Type Alias: GetIncidentData"
sidebar_label: "GetIncidentData"
mdx:
  format: md
---

# Type Alias: GetIncidentData

```ts
type GetIncidentData = object;
```

Defined in: [gen/types.gen.ts:11616](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L11616)

## Properties

### body?

```ts
optional body?: never;
```

Defined in: [gen/types.gen.ts:11617](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L11617)

---

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:11618](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L11618)

#### incidentKey

```ts
incidentKey: IncidentKey;
```

The assigned key of the incident, which acts as a unique identifier for this incident.

---

### query?

```ts
optional query?: never;
```

Defined in: [gen/types.gen.ts:11624](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L11624)

---

### url

```ts
url: "/incidents/{incidentKey}";
```

Defined in: [gen/types.gen.ts:11625](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L11625)
