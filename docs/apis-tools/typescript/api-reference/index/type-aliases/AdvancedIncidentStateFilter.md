---
title: "Type Alias: AdvancedIncidentStateFilter"
sidebar_label: "AdvancedIncidentStateFilter"
mdx:
  format: md
---

# Type Alias: AdvancedIncidentStateFilter

```ts
type AdvancedIncidentStateFilter = object;
```

Defined in: [gen/types.gen.ts:3475](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3475)

Advanced filter

Advanced IncidentStateEnum filter

## Properties

### $eq?

```ts
optional $eq?: IncidentStateEnum;
```

Defined in: [gen/types.gen.ts:3479](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3479)

Checks for equality with the provided value.

---

### $exists?

```ts
optional $exists?: boolean;
```

Defined in: [gen/types.gen.ts:3487](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3487)

Checks if the current property exists.

---

### $in?

```ts
optional $in?: IncidentStateEnum[];
```

Defined in: [gen/types.gen.ts:3491](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3491)

Checks if the property matches any of the provided values.

---

### $like?

```ts
optional $like?: LikeFilter;
```

Defined in: [gen/types.gen.ts:3496](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3496)

---

### $neq?

```ts
optional $neq?: IncidentStateEnum;
```

Defined in: [gen/types.gen.ts:3483](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3483)

Checks for inequality with the provided value.

---

### $notIn?

```ts
optional $notIn?: IncidentStateEnum[];
```

Defined in: [gen/types.gen.ts:3495](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3495)

Checks if the property does not match any of the provided values.
