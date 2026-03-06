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

Defined in: [gen/types.gen.ts:4455](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4455)

JSON object with changed job attribute values. The job cannot be completed or failed with this endpoint, use the complete job or fail job endpoints instead.

## Properties

### retries?

```ts
optional retries: number | null;
```

Defined in: [gen/types.gen.ts:4459](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4459)

The new number of retries for the job.

***

### timeout?

```ts
optional timeout: number | null;
```

Defined in: [gen/types.gen.ts:4463](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4463)

The new timeout for the job in milliseconds.
