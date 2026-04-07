---
title: "Type Alias: AdvancedJobStateFilter"
sidebar_label: "AdvancedJobStateFilter"
mdx:
  format: md
---

# Type Alias: AdvancedJobStateFilter

```ts
type AdvancedJobStateFilter = object;
```

Defined in: [gen/types.gen.ts:4628](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4628)

Advanced filter

Advanced JobStateEnum filter.

## Properties

### $eq?

```ts
optional $eq?: JobStateEnum;
```

Defined in: [gen/types.gen.ts:4632](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4632)

Checks for equality with the provided value.

---

### $exists?

```ts
optional $exists?: boolean;
```

Defined in: [gen/types.gen.ts:4640](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4640)

Checks if the current property exists.

---

### $in?

```ts
optional $in?: JobStateEnum[];
```

Defined in: [gen/types.gen.ts:4644](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4644)

Checks if the property matches any of the provided values.

---

### $like?

```ts
optional $like?: LikeFilter;
```

Defined in: [gen/types.gen.ts:4645](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4645)

---

### $neq?

```ts
optional $neq?: JobStateEnum;
```

Defined in: [gen/types.gen.ts:4636](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4636)

Checks for inequality with the provided value.
