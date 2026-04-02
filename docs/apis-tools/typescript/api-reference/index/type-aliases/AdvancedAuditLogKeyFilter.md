---
title: "Type Alias: AdvancedAuditLogKeyFilter"
sidebar_label: "AdvancedAuditLogKeyFilter"
mdx:
  format: md
---

# Type Alias: AdvancedAuditLogKeyFilter

```ts
type AdvancedAuditLogKeyFilter = object;
```

Defined in: [gen/types.gen.ts:5018](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5018)

Advanced filter

Advanced AuditLogKey filter.

## Properties

### $eq?

```ts
optional $eq?: AuditLogKey;
```

Defined in: [gen/types.gen.ts:5022](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5022)

Checks for equality with the provided value.

---

### $exists?

```ts
optional $exists?: boolean;
```

Defined in: [gen/types.gen.ts:5030](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5030)

Checks if the current property exists.

---

### $in?

```ts
optional $in?: AuditLogKey[];
```

Defined in: [gen/types.gen.ts:5034](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5034)

Checks if the property matches any of the provided values.

---

### $neq?

```ts
optional $neq?: AuditLogKey;
```

Defined in: [gen/types.gen.ts:5026](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5026)

Checks for inequality with the provided value.

---

### $notIn?

```ts
optional $notIn?: AuditLogKey[];
```

Defined in: [gen/types.gen.ts:5038](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5038)

Checks if the property matches none of the provided values.
