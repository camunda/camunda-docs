---
title: "Type Alias: JobResultAdHocSubProcess"
sidebar_label: "JobResultAdHocSubProcess"
mdx:
  format: md
---

# Type Alias: JobResultAdHocSubProcess

```ts
type JobResultAdHocSubProcess = {
  activateElements?: JobResultActivateElement[];
  isCancelRemainingInstances?: boolean;
  isCompletionConditionFulfilled?: boolean;
  type?: string;
} | null;
```

Defined in: [gen/types.gen.ts:3838](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3838)

Job result details for an ad‑hoc sub‑process, including elements to activate and flags indicating completion or cancellation behavior.

## Type Declaration

```ts
{
  activateElements?: JobResultActivateElement[];
  isCancelRemainingInstances?: boolean;
  isCompletionConditionFulfilled?: boolean;
  type?: string;
}
```

### activateElements?

```ts
optional activateElements: JobResultActivateElement[];
```

Indicates which elements need to be activated in the ad-hoc subprocess.

### isCancelRemainingInstances?

```ts
optional isCancelRemainingInstances: boolean;
```

Indicates whether the remaining instances of the ad-hoc subprocess should be canceled.

### isCompletionConditionFulfilled?

```ts
optional isCompletionConditionFulfilled: boolean;
```

Indicates whether the completion condition of the ad-hoc subprocess is fulfilled.

### type?

```ts
optional type: string;
```

Used to distinguish between different types of job results.

`null`
