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

Defined in: [gen/types.gen.ts:3708](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3708)

## Properties

### errorMessage?

```ts
optional errorMessage: string;
```

Defined in: [gen/types.gen.ts:3716](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3716)

An optional error message describing why the job failed; if not provided, an empty string is used.

---

### retries?

```ts
optional retries: number;
```

Defined in: [gen/types.gen.ts:3712](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3712)

The amount of retries the job should have left

---

### retryBackOff?

```ts
optional retryBackOff: number;
```

Defined in: [gen/types.gen.ts:3720](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3720)

An optional retry back off for the failed job. The job will not be retryable before the current time plus the back off time. The default is 0 which means the job is retryable immediately.

---

### variables?

```ts
optional variables: object;
```

Defined in: [gen/types.gen.ts:3725](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3725)

JSON object that will instantiate the variables at the local scope of the job's associated task.

#### Index Signature

```ts
[key: string]: unknown
```
