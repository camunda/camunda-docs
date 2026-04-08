---
title: "Type Alias: ResolveIncidentData"
sidebar_label: "ResolveIncidentData"
mdx:
  format: md
---

# Type Alias: ResolveIncidentData

```ts
type ResolveIncidentData = object;
```

Defined in: [gen/types.gen.ts:11662](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L11662)

## Properties

### body?

```ts
optional body?: IncidentResolutionRequest;
```

Defined in: [gen/types.gen.ts:11663](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L11663)

---

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:11664](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L11664)

#### incidentKey

```ts
incidentKey: IncidentKey;
```

Key of the incident to resolve.

---

### query?

```ts
optional query?: never;
```

Defined in: [gen/types.gen.ts:11670](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L11670)

---

### url

```ts
url: "/incidents/{incidentKey}/resolution";
```

Defined in: [gen/types.gen.ts:11671](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L11671)
