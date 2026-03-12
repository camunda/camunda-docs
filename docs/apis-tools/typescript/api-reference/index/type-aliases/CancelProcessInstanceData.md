---
title: "Type Alias: CancelProcessInstanceData"
sidebar_label: "CancelProcessInstanceData"
mdx:
  format: md
---

# Type Alias: CancelProcessInstanceData

```ts
type CancelProcessInstanceData = object;
```

Defined in: [gen/types.gen.ts:13269](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L13269)

## Properties

### body?

```ts
optional body: 
  | {
  operationReference?: OperationReference;
}
  | null;
```

Defined in: [gen/types.gen.ts:13270](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L13270)

***

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:13273](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L13273)

#### processInstanceKey

```ts
processInstanceKey: ProcessInstanceKey;
```

The key of the process instance to cancel.

***

### query?

```ts
optional query: never;
```

Defined in: [gen/types.gen.ts:13279](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L13279)

***

### url

```ts
url: "/process-instances/{processInstanceKey}/cancellation";
```

Defined in: [gen/types.gen.ts:13280](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L13280)
