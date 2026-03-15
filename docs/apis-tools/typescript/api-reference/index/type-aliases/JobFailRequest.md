---
title: "Type Alias: JobFailRequest"
sidebar_label: "JobFailRequest"
mdx:
  format: md
---

# Type Alias: JobFailRequest

```ts
type JobFailRequest = object;
```

Defined in: [gen/types.gen.ts:4350](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4350)

## Properties

### errorMessage?

```ts
optional errorMessage: string;
```

Defined in: [gen/types.gen.ts:4358](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4358)

An optional error message describing why the job failed; if not provided, an empty string is used.

***

### retries?

```ts
optional retries: number;
```

Defined in: [gen/types.gen.ts:4354](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4354)

The amount of retries the job should have left

***

### retryBackOff?

```ts
optional retryBackOff: number;
```

Defined in: [gen/types.gen.ts:4362](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4362)

An optional retry back off for the failed job. The job will not be retryable before the current time plus the back off time. The default is 0 which means the job is retryable immediately.

***

### variables?

```ts
optional variables: object;
```

Defined in: [gen/types.gen.ts:4367](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4367)

JSON object that will instantiate the variables at the local scope of the job's associated task.

#### Index Signature

```ts
[key: string]: unknown
```
