---
title: "Type Alias: FailJobData"
sidebar_label: "FailJobData"
mdx:
  format: md
---

# Type Alias: FailJobData

```ts
type FailJobData = object;
```

Defined in: [gen/types.gen.ts:11969](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L11969)

## Properties

### body?

```ts
optional body: JobFailRequest;
```

Defined in: [gen/types.gen.ts:11970](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L11970)

***

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:11971](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L11971)

#### jobKey

```ts
jobKey: JobKey;
```

The key of the job to fail.

***

### query?

```ts
optional query: never;
```

Defined in: [gen/types.gen.ts:11977](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L11977)

***

### url

```ts
url: "/jobs/{jobKey}/failure";
```

Defined in: [gen/types.gen.ts:11978](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L11978)
