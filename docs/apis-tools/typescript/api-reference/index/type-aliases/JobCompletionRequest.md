---
title: "Type Alias: JobCompletionRequest"
sidebar_label: "JobCompletionRequest"
mdx:
  format: md
---

# Type Alias: JobCompletionRequest

```ts
type JobCompletionRequest = object;
```

Defined in: [gen/types.gen.ts:3750](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3750)

## Properties

### result?

```ts
optional result: JobResult;
```

Defined in: [gen/types.gen.ts:3757](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3757)

---

### variables?

```ts
optional variables:
  | {
[key: string]: unknown;
}
  | null;
```

Defined in: [gen/types.gen.ts:3754](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3754)

The variables to complete the job with.
