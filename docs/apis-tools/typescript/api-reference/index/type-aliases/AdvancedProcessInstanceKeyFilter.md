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

Defined in: [gen/types.gen.ts:4782](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4782)

Advanced filter

Advanced ProcessInstanceKey filter.

## Properties

### $eq?

```ts
optional $eq: ProcessInstanceKey;
```

Defined in: [gen/types.gen.ts:4786](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4786)

Checks for equality with the provided value.

***

### $exists?

```ts
optional $exists: boolean;
```

Defined in: [gen/types.gen.ts:4794](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4794)

Checks if the current property exists.

***

### $in?

```ts
optional $in: ProcessInstanceKey[];
```

Defined in: [gen/types.gen.ts:4798](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4798)

Checks if the property matches any of the provided values.

***

### $neq?

```ts
optional $neq: ProcessInstanceKey;
```

Defined in: [gen/types.gen.ts:4790](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4790)

Checks for inequality with the provided value.

***

### $notIn?

```ts
optional $notIn: ProcessInstanceKey[];
```

Defined in: [gen/types.gen.ts:4802](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4802)

Checks if the property matches none of the provided values.
