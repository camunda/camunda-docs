---
title: "Type Alias: DocumentCreationFailureDetail"
sidebar_label: "DocumentCreationFailureDetail"
mdx:
  format: md
---

# Type Alias: DocumentCreationFailureDetail

```ts
type DocumentCreationFailureDetail = object;
```

Defined in: [gen/types.gen.ts:2289](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2289)

## Properties

### detail?

```ts
optional detail: string;
```

Defined in: [gen/types.gen.ts:2305](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2305)

A human-readable explanation specific to this occurrence of the problem.

---

### fileName?

```ts
optional fileName: string;
```

Defined in: [gen/types.gen.ts:2293](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2293)

The name of the file that failed to upload.

---

### status?

```ts
optional status: number;
```

Defined in: [gen/types.gen.ts:2297](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2297)

The HTTP status code of the failure.

---

### title?

```ts
optional title: string;
```

Defined in: [gen/types.gen.ts:2301](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2301)

A short, human-readable summary of the problem type.
