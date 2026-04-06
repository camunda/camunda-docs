---
title: "Type Alias: AdvancedProcessInstanceStateFilter"
sidebar_label: "AdvancedProcessInstanceStateFilter"
mdx:
  format: md
---

# Type Alias: AdvancedProcessInstanceStateFilter

```ts
type AdvancedProcessInstanceStateFilter = object;
```

Defined in: [gen/types.gen.ts:6878](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L6878)

Advanced filter

Advanced ProcessInstanceStateEnum filter.

## Properties

### $eq?

```ts
optional $eq?: ProcessInstanceStateEnum;
```

Defined in: [gen/types.gen.ts:6882](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L6882)

Checks for equality with the provided value.

---

### $exists?

```ts
optional $exists?: boolean;
```

Defined in: [gen/types.gen.ts:6890](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L6890)

Checks if the current property exists.

---

### $in?

```ts
optional $in?: ProcessInstanceStateEnum[];
```

Defined in: [gen/types.gen.ts:6894](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L6894)

Checks if the property matches any of the provided values.

---

### $like?

```ts
optional $like?: LikeFilter;
```

Defined in: [gen/types.gen.ts:6895](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L6895)

---

### $neq?

```ts
optional $neq?: ProcessInstanceStateEnum;
```

Defined in: [gen/types.gen.ts:6886](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L6886)

Checks for inequality with the provided value.
