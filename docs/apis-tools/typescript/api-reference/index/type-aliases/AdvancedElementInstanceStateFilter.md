---
title: "Type Alias: AdvancedElementInstanceStateFilter"
sidebar_label: "AdvancedElementInstanceStateFilter"
mdx:
  format: md
---

# Type Alias: AdvancedElementInstanceStateFilter

```ts
type AdvancedElementInstanceStateFilter = object;
```

Defined in: [gen/types.gen.ts:2610](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2610)

Advanced filter

Advanced ElementInstanceStateEnum filter.

## Properties

### $eq?

```ts
optional $eq?: ElementInstanceStateEnum;
```

Defined in: [gen/types.gen.ts:2614](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2614)

Checks for equality with the provided value.

---

### $exists?

```ts
optional $exists?: boolean;
```

Defined in: [gen/types.gen.ts:2622](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2622)

Checks if the current property exists.

---

### $in?

```ts
optional $in?: ElementInstanceStateEnum[];
```

Defined in: [gen/types.gen.ts:2626](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2626)

Checks if the property matches any of the provided values.

---

### $like?

```ts
optional $like?: LikeFilter;
```

Defined in: [gen/types.gen.ts:2627](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2627)

---

### $neq?

```ts
optional $neq?: ElementInstanceStateEnum;
```

Defined in: [gen/types.gen.ts:2618](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2618)

Checks for inequality with the provided value.
