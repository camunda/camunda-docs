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

Defined in: [gen/types.gen.ts:11986](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L11986)

## Properties

### body?

```ts
optional body: JobCompletionRequest;
```

Defined in: [gen/types.gen.ts:11987](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L11987)

---

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:11988](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L11988)

#### jobKey

```ts
jobKey: JobKey;
```

The key of the job to complete.

---

### query?

```ts
optional query: never;
```

Defined in: [gen/types.gen.ts:11994](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L11994)

---

### url

```ts
url: "/jobs/{jobKey}/completion";
```

Defined in: [gen/types.gen.ts:11995](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L11995)
