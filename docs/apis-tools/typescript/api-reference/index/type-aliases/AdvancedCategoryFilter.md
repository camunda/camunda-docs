---
title: "Type Alias: AdvancedCategoryFilter"
sidebar_label: "AdvancedCategoryFilter"
mdx:
  format: md
---

# Type Alias: AdvancedCategoryFilter

```ts
type AdvancedCategoryFilter = object;
```

Defined in: [gen/types.gen.ts:421](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L421)

Advanced filter

Advanced AuditLogCategoryEnum filter.

## Properties

### $eq?

```ts
optional $eq?: AuditLogCategoryEnum;
```

Defined in: [gen/types.gen.ts:425](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L425)

Checks for equality with the provided value.

---

### $exists?

```ts
optional $exists?: boolean;
```

Defined in: [gen/types.gen.ts:433](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L433)

Checks if the current property exists.

---

### $in?

```ts
optional $in?: AuditLogCategoryEnum[];
```

Defined in: [gen/types.gen.ts:437](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L437)

Checks if the property matches any of the provided values.

---

### $like?

```ts
optional $like?: LikeFilter;
```

Defined in: [gen/types.gen.ts:438](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L438)

---

### $neq?

```ts
optional $neq?: AuditLogCategoryEnum;
```

Defined in: [gen/types.gen.ts:429](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L429)

Checks for inequality with the provided value.
