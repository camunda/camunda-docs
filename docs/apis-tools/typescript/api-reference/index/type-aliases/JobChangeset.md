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

Defined in: [gen/types.gen.ts:4526](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4526)

JSON object with changed job attribute values. The job cannot be completed or failed with this endpoint, use the complete job or fail job endpoints instead.

## Properties

### retries?

```ts
optional retries?: number | null;
```

Defined in: [gen/types.gen.ts:4530](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4530)

The new number of retries for the job.

---

### timeout?

```ts
optional timeout?: number | null;
```

Defined in: [gen/types.gen.ts:4534](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4534)

The new timeout for the job in milliseconds.
