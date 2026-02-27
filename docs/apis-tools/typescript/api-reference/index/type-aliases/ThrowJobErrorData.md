---
title: "Type Alias: ThrowJobErrorData"
sidebar_label: "ThrowJobErrorData"
mdx:
  format: md
---

# Type Alias: ThrowJobErrorData

```ts
type ThrowJobErrorData = object;
```

Defined in: [gen/types.gen.ts:12034](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L12034)

## Properties

### body

```ts
body: JobErrorRequest;
```

Defined in: [gen/types.gen.ts:12035](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L12035)

---

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:12036](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L12036)

#### jobKey

```ts
jobKey: JobKey;
```

The key of the job.

---

### query?

```ts
optional query: never;
```

Defined in: [gen/types.gen.ts:12042](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L12042)

---

### url

```ts
url: "/jobs/{jobKey}/error";
```

Defined in: [gen/types.gen.ts:12043](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L12043)
