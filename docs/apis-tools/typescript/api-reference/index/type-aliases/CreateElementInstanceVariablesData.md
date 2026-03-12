---
title: "Type Alias: CreateElementInstanceVariablesData"
sidebar_label: "CreateElementInstanceVariablesData"
mdx:
  format: md
---

# Type Alias: CreateElementInstanceVariablesData

```ts
type CreateElementInstanceVariablesData = object;
```

Defined in: [gen/types.gen.ts:10476](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L10476)

## Properties

### body

```ts
body: SetVariableRequest;
```

Defined in: [gen/types.gen.ts:10477](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L10477)

***

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:10478](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L10478)

#### elementInstanceKey

```ts
elementInstanceKey: ElementInstanceKey;
```

The key of the element instance to update the variables for.
This can be the process instance key (as obtained during instance creation), or a given
element, such as a service task (see the `elementInstanceKey` on the job message).

***

### query?

```ts
optional query: never;
```

Defined in: [gen/types.gen.ts:10487](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L10487)

***

### url

```ts
url: "/element-instances/{elementInstanceKey}/variables";
```

Defined in: [gen/types.gen.ts:10488](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L10488)
