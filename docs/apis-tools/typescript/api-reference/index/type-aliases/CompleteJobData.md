---
title: "Type Alias: CompleteJobData"
sidebar_label: "CompleteJobData"
mdx:
  format: md
---

# Type Alias: CompleteJobData

```ts
type CompleteJobData = object;
```

Defined in: [gen/types.gen.ts:11872](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L11872)

## Properties

### body?

```ts
optional body: JobCompletionRequest;
```

Defined in: [gen/types.gen.ts:11873](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L11873)

***

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:11874](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L11874)

#### jobKey

```ts
jobKey: JobKey;
```

The key of the job to complete.

***

### query?

```ts
optional query: never;
```

Defined in: [gen/types.gen.ts:11880](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L11880)

***

### url

```ts
url: "/jobs/{jobKey}/completion";
```

Defined in: [gen/types.gen.ts:11881](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L11881)
