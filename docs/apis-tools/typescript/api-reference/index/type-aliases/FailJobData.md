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

Defined in: [gen/types.gen.ts:12083](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L12083)

## Properties

### body?

```ts
optional body: JobFailRequest;
```

Defined in: [gen/types.gen.ts:12084](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L12084)

---

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:12085](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L12085)

#### jobKey

```ts
jobKey: JobKey;
```

The key of the job to fail.

---

### query?

```ts
optional query: never;
```

Defined in: [gen/types.gen.ts:12091](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L12091)

---

### url

```ts
url: "/jobs/{jobKey}/failure";
```

Defined in: [gen/types.gen.ts:12092](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L12092)
