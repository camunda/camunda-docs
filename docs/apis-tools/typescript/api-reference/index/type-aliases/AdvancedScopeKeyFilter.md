---
title: "Type Alias: AdvancedScopeKeyFilter"
sidebar_label: "AdvancedScopeKeyFilter"
mdx:
  format: md
---

# Type Alias: AdvancedScopeKeyFilter

```ts
type AdvancedScopeKeyFilter = object;
```

Defined in: [gen/types.gen.ts:4919](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4919)

Advanced filter

Advanced ScopeKey filter.

## Properties

### $eq?

```ts
optional $eq?: ScopeKey;
```

Defined in: [gen/types.gen.ts:4923](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4923)

Checks for equality with the provided value.

---

### $exists?

```ts
optional $exists?: boolean;
```

Defined in: [gen/types.gen.ts:4931](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4931)

Checks if the current property exists.

---

### $in?

```ts
optional $in?: ScopeKey[];
```

Defined in: [gen/types.gen.ts:4935](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4935)

Checks if the property matches any of the provided values.

---

### $neq?

```ts
optional $neq?: ScopeKey;
```

Defined in: [gen/types.gen.ts:4927](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4927)

Checks for inequality with the provided value.

---

### $notIn?

```ts
optional $notIn?: ScopeKey[];
```

Defined in: [gen/types.gen.ts:4939](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4939)

Checks if the property matches none of the provided values.
