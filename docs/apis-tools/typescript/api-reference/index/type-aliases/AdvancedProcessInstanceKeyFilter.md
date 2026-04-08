---
title: "Type Alias: AdvancedProcessInstanceKeyFilter"
sidebar_label: "AdvancedProcessInstanceKeyFilter"
mdx:
  format: md
---

# Type Alias: AdvancedProcessInstanceKeyFilter

```ts
type AdvancedProcessInstanceKeyFilter = object;
```

Defined in: [gen/types.gen.ts:4785](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4785)

Advanced filter

Advanced ProcessInstanceKey filter.

## Properties

### $eq?

```ts
optional $eq?: ProcessInstanceKey;
```

Defined in: [gen/types.gen.ts:4789](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4789)

Checks for equality with the provided value.

---

### $exists?

```ts
optional $exists?: boolean;
```

Defined in: [gen/types.gen.ts:4797](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4797)

Checks if the current property exists.

---

### $in?

```ts
optional $in?: ProcessInstanceKey[];
```

Defined in: [gen/types.gen.ts:4801](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4801)

Checks if the property matches any of the provided values.

---

### $neq?

```ts
optional $neq?: ProcessInstanceKey;
```

Defined in: [gen/types.gen.ts:4793](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4793)

Checks for inequality with the provided value.

---

### $notIn?

```ts
optional $notIn?: ProcessInstanceKey[];
```

Defined in: [gen/types.gen.ts:4805](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4805)

Checks if the property matches none of the provided values.
