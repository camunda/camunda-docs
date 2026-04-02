---
title: "Type Alias: AdvancedIntegerFilter"
sidebar_label: "AdvancedIntegerFilter"
mdx:
  format: md
---

# Type Alias: AdvancedIntegerFilter

```ts
type AdvancedIntegerFilter = object;
```

Defined in: [gen/types.gen.ts:2832](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2832)

Advanced filter

Advanced integer (int32) filter.

## Properties

### $eq?

```ts
optional $eq?: number;
```

Defined in: [gen/types.gen.ts:2836](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2836)

Checks for equality with the provided value.

---

### $exists?

```ts
optional $exists?: boolean;
```

Defined in: [gen/types.gen.ts:2844](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2844)

Checks if the current property exists.

---

### $gt?

```ts
optional $gt?: number;
```

Defined in: [gen/types.gen.ts:2848](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2848)

Greater than comparison with the provided value.

---

### $gte?

```ts
optional $gte?: number;
```

Defined in: [gen/types.gen.ts:2852](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2852)

Greater than or equal comparison with the provided value.

---

### $in?

```ts
optional $in?: number[];
```

Defined in: [gen/types.gen.ts:2864](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2864)

Checks if the property matches any of the provided values.

---

### $lt?

```ts
optional $lt?: number;
```

Defined in: [gen/types.gen.ts:2856](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2856)

Lower than comparison with the provided value.

---

### $lte?

```ts
optional $lte?: number;
```

Defined in: [gen/types.gen.ts:2860](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2860)

Lower than or equal comparison with the provided value.

---

### $neq?

```ts
optional $neq?: number;
```

Defined in: [gen/types.gen.ts:2840](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2840)

Checks for inequality with the provided value.
