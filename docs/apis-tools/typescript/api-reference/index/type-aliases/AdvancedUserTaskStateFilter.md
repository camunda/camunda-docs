---
title: "Type Alias: AdvancedUserTaskStateFilter"
sidebar_label: "AdvancedUserTaskStateFilter"
mdx:
  format: md
---

# Type Alias: AdvancedUserTaskStateFilter

```ts
type AdvancedUserTaskStateFilter = object;
```

Defined in: [gen/types.gen.ts:7891](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L7891)

Advanced filter

Advanced UserTaskStateEnum filter.

## Properties

### $eq?

```ts
optional $eq?: UserTaskStateEnum;
```

Defined in: [gen/types.gen.ts:7895](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L7895)

Checks for equality with the provided value.

---

### $exists?

```ts
optional $exists?: boolean;
```

Defined in: [gen/types.gen.ts:7903](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L7903)

Checks if the current property exists.

---

### $in?

```ts
optional $in?: UserTaskStateEnum[];
```

Defined in: [gen/types.gen.ts:7907](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L7907)

Checks if the property matches any of the provided values.

---

### $like?

```ts
optional $like?: LikeFilter;
```

Defined in: [gen/types.gen.ts:7908](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L7908)

---

### $neq?

```ts
optional $neq?: UserTaskStateEnum;
```

Defined in: [gen/types.gen.ts:7899](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L7899)

Checks for inequality with the provided value.
