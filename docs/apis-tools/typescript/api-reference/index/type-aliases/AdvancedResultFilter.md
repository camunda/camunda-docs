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

Defined in: [gen/types.gen.ts:455](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L455)

Advanced filter

Advanced AuditLogResultEnum filter.

## Properties

### $eq?

```ts
optional $eq: AuditLogResultEnum;
```

Defined in: [gen/types.gen.ts:459](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L459)

Checks for equality with the provided value.

***

### $exists?

```ts
optional $exists: boolean;
```

Defined in: [gen/types.gen.ts:467](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L467)

Checks if the current property exists.

***

### $in?

```ts
optional $in: AuditLogResultEnum[];
```

Defined in: [gen/types.gen.ts:471](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L471)

Checks if the property matches any of the provided values.

***

### $like?

```ts
optional $like: LikeFilter;
```

Defined in: [gen/types.gen.ts:472](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L472)

***

### $neq?

```ts
optional $neq: AuditLogResultEnum;
```

Defined in: [gen/types.gen.ts:463](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L463)

Checks for inequality with the provided value.
