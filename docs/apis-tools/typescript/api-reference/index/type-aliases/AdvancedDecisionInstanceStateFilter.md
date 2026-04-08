---
title: "Type Alias: AdvancedDecisionInstanceStateFilter"
sidebar_label: "AdvancedDecisionInstanceStateFilter"
mdx:
  format: md
---

# Type Alias: AdvancedDecisionInstanceStateFilter

```ts
type AdvancedDecisionInstanceStateFilter = object;
```

Defined in: [gen/types.gen.ts:1945](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L1945)

Advanced filter

Advanced DecisionInstanceStateEnum filter.

## Properties

### $eq?

```ts
optional $eq?: DecisionInstanceStateEnum;
```

Defined in: [gen/types.gen.ts:1949](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L1949)

Checks for equality with the provided value.

---

### $exists?

```ts
optional $exists?: boolean;
```

Defined in: [gen/types.gen.ts:1957](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L1957)

Checks if the current property exists.

---

### $in?

```ts
optional $in?: DecisionInstanceStateEnum[];
```

Defined in: [gen/types.gen.ts:1961](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L1961)

Checks if the property matches any of the provided values.

---

### $like?

```ts
optional $like?: LikeFilter;
```

Defined in: [gen/types.gen.ts:1966](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L1966)

---

### $neq?

```ts
optional $neq?: DecisionInstanceStateEnum;
```

Defined in: [gen/types.gen.ts:1953](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L1953)

Checks for inequality with the provided value.

---

### $notIn?

```ts
optional $notIn?: DecisionInstanceStateEnum[];
```

Defined in: [gen/types.gen.ts:1965](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L1965)

Checks if the property matches none of the provided values.
