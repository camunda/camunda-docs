---
title: "Type Alias: AdvancedResultFilter"
sidebar_label: "AdvancedResultFilter"
mdx:
  format: md
---

# Type Alias: AdvancedResultFilter

```ts
type AdvancedResultFilter = object;
```

Defined in: [gen/types.gen.ts:451](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L451)

Advanced filter

Advanced AuditLogResultEnum filter.

## Properties

### $eq?

```ts
optional $eq?: AuditLogResultEnum;
```

Defined in: [gen/types.gen.ts:455](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L455)

Checks for equality with the provided value.

---

### $exists?

```ts
optional $exists?: boolean;
```

Defined in: [gen/types.gen.ts:463](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L463)

Checks if the current property exists.

---

### $in?

```ts
optional $in?: AuditLogResultEnum[];
```

Defined in: [gen/types.gen.ts:467](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L467)

Checks if the property matches any of the provided values.

---

### $like?

```ts
optional $like?: LikeFilter;
```

Defined in: [gen/types.gen.ts:468](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L468)

---

### $neq?

```ts
optional $neq?: AuditLogResultEnum;
```

Defined in: [gen/types.gen.ts:459](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L459)

Checks for inequality with the provided value.
