---
title: "Type Alias: JobErrorRequest"
sidebar_label: "JobErrorRequest"
mdx:
  format: md
---

# Type Alias: JobErrorRequest

```ts
type JobErrorRequest = object;
```

Defined in: [gen/types.gen.ts:3730](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3730)

## Properties

### errorCode

```ts
errorCode: string;
```

Defined in: [gen/types.gen.ts:3735](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3735)

The error code that will be matched with an error catch event.

---

### errorMessage?

```ts
optional errorMessage: string | null;
```

Defined in: [gen/types.gen.ts:3740](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3740)

An error message that provides additional context.

---

### variables?

```ts
optional variables:
  | {
[key: string]: unknown;
}
  | null;
```

Defined in: [gen/types.gen.ts:3745](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3745)

JSON object that will instantiate the variables at the local scope of the error catch event that catches the thrown error.
