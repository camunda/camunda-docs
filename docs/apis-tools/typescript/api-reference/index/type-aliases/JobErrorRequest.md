---
title: "Type Alias: JobErrorRequest"
sidebar_label: "JobErrorRequest"
mdx:
  format: md
---

# Type Alias: JobErrorRequest

```ts
type JobErrorRequest = object;
```

Defined in: [gen/types.gen.ts:4372](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4372)

## Properties

### errorCode

```ts
errorCode: string;
```

Defined in: [gen/types.gen.ts:4377](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4377)

The error code that will be matched with an error catch event.

***

### errorMessage?

```ts
optional errorMessage: string | null;
```

Defined in: [gen/types.gen.ts:4382](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4382)

An error message that provides additional context.

***

### variables?

```ts
optional variables: 
  | {
[key: string]: unknown;
}
  | null;
```

Defined in: [gen/types.gen.ts:4387](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4387)

JSON object that will instantiate the variables at the local scope of the error catch event that catches the thrown error.
