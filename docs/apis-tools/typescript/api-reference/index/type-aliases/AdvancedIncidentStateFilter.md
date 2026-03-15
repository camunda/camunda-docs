---
title: "Type Alias: AdvancedIncidentStateFilter"
sidebar_label: "AdvancedIncidentStateFilter"
mdx:
  format: md
---

# Type Alias: AdvancedIncidentStateFilter

```ts
type AdvancedIncidentStateFilter = object;
```

Defined in: [gen/types.gen.ts:3472](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L3472)

Advanced filter

Advanced IncidentStateEnum filter

## Properties

### $eq?

```ts
optional $eq: IncidentStateEnum;
```

Defined in: [gen/types.gen.ts:3476](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L3476)

Checks for equality with the provided value.

***

### $exists?

```ts
optional $exists: boolean;
```

Defined in: [gen/types.gen.ts:3484](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L3484)

Checks if the current property exists.

***

### $in?

```ts
optional $in: IncidentStateEnum[];
```

Defined in: [gen/types.gen.ts:3488](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L3488)

Checks if the property matches any of the provided values.

***

### $like?

```ts
optional $like: LikeFilter;
```

Defined in: [gen/types.gen.ts:3493](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L3493)

***

### $neq?

```ts
optional $neq: IncidentStateEnum;
```

Defined in: [gen/types.gen.ts:3480](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L3480)

Checks for inequality with the provided value.

***

### $notIn?

```ts
optional $notIn: IncidentStateEnum[];
```

Defined in: [gen/types.gen.ts:3492](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L3492)

Checks if the property does not match any of the provided values.
