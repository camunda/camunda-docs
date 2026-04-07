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

Defined in: [gen/types.gen.ts:4353](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4353)

## Properties

### errorMessage?

```ts
optional errorMessage?: string;
```

Defined in: [gen/types.gen.ts:4361](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4361)

An optional error message describing why the job failed; if not provided, an empty string is used.

---

### retries?

```ts
optional retries?: number;
```

Defined in: [gen/types.gen.ts:4357](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4357)

The amount of retries the job should have left

---

### retryBackOff?

```ts
optional retryBackOff?: number;
```

Defined in: [gen/types.gen.ts:4365](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4365)

An optional retry back off for the failed job. The job will not be retryable before the current time plus the back off time. The default is 0 which means the job is retryable immediately.

---

### variables?

```ts
optional variables?: object;
```

Defined in: [gen/types.gen.ts:4370](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4370)

JSON object that will instantiate the variables at the local scope of the job's associated task.

#### Index Signature

```ts
[key: string]: unknown
```
