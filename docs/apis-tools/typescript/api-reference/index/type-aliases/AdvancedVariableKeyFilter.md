---
title: "Type Alias: AdvancedVariableKeyFilter"
sidebar_label: "AdvancedVariableKeyFilter"
mdx:
  format: md
---

# Type Alias: AdvancedVariableKeyFilter

```ts
type AdvancedVariableKeyFilter = object;
```

Defined in: [gen/types.gen.ts:4949](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4949)

Advanced filter

Advanced VariableKey filter.

## Properties

### $eq?

```ts
optional $eq: VariableKey;
```

Defined in: [gen/types.gen.ts:4953](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4953)

Checks for equality with the provided value.

***

### $exists?

```ts
optional $exists: boolean;
```

Defined in: [gen/types.gen.ts:4961](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4961)

Checks if the current property exists.

***

### $in?

```ts
optional $in: VariableKey[];
```

Defined in: [gen/types.gen.ts:4965](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4965)

Checks if the property matches any of the provided values.

***

### $neq?

```ts
optional $neq: VariableKey;
```

Defined in: [gen/types.gen.ts:4957](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4957)

Checks for inequality with the provided value.

***

### $notIn?

```ts
optional $notIn: VariableKey[];
```

Defined in: [gen/types.gen.ts:4969](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4969)

Checks if the property matches none of the provided values.
