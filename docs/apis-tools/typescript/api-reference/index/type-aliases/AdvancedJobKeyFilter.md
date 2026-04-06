---
title: "Type Alias: AdvancedJobKeyFilter"
sidebar_label: "AdvancedJobKeyFilter"
mdx:
  format: md
---

# Type Alias: AdvancedJobKeyFilter

```ts
type AdvancedJobKeyFilter = object;
```

Defined in: [gen/types.gen.ts:4851](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4851)

Advanced filter

Advanced JobKey filter.

## Properties

### $eq?

```ts
optional $eq?: JobKey;
```

Defined in: [gen/types.gen.ts:4855](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4855)

Checks for equality with the provided value.

---

### $exists?

```ts
optional $exists?: boolean;
```

Defined in: [gen/types.gen.ts:4863](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4863)

Checks if the current property exists.

---

### $in?

```ts
optional $in?: JobKey[];
```

Defined in: [gen/types.gen.ts:4867](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4867)

Checks if the property matches any of the provided values.

---

### $neq?

```ts
optional $neq?: JobKey;
```

Defined in: [gen/types.gen.ts:4859](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4859)

Checks for inequality with the provided value.

---

### $notIn?

```ts
optional $notIn?: JobKey[];
```

Defined in: [gen/types.gen.ts:4871](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4871)

Checks if the property matches none of the provided values.
