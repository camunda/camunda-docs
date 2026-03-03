---
title: "Type Alias: JobChangeset"
sidebar_label: "JobChangeset"
mdx:
  format: md
---

# Type Alias: JobChangeset

```ts
type JobChangeset = object;
```

Defined in: [gen/types.gen.ts:3881](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3881)

JSON object with changed job attribute values. The job cannot be completed or failed with this endpoint, use the complete job or fail job endpoints instead.

## Properties

### retries?

```ts
optional retries: number | null;
```

Defined in: [gen/types.gen.ts:3885](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3885)

The new number of retries for the job.

---

### timeout?

```ts
optional timeout: number | null;
```

Defined in: [gen/types.gen.ts:3889](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3889)

The new timeout for the job in milliseconds.
