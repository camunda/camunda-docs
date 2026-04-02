---
title: "Type Alias: AdvancedResourceKeyFilter"
sidebar_label: "AdvancedResourceKeyFilter"
mdx:
  format: md
---

# Type Alias: AdvancedResourceKeyFilter

```ts
type AdvancedResourceKeyFilter = object;
```

Defined in: [gen/types.gen.ts:2349](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2349)

Advanced filter

Advanced ResourceKey filter.

## Properties

### $eq?

```ts
optional $eq?: ResourceKey;
```

Defined in: [gen/types.gen.ts:2353](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2353)

Checks for equality with the provided value.

---

### $exists?

```ts
optional $exists?: boolean;
```

Defined in: [gen/types.gen.ts:2361](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2361)

Checks if the current property exists.

---

### $in?

```ts
optional $in?: ResourceKey[];
```

Defined in: [gen/types.gen.ts:2365](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2365)

Checks if the property matches any of the provided values.

---

### $neq?

```ts
optional $neq?: ResourceKey;
```

Defined in: [gen/types.gen.ts:2357](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2357)

Checks for inequality with the provided value.

---

### $notIn?

```ts
optional $notIn?: ResourceKey[];
```

Defined in: [gen/types.gen.ts:2369](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2369)

Checks if the property matches none of the provided values.
