---
title: "Type Alias: JobFilter"
sidebar_label: "JobFilter"
mdx:
  format: md
---

# Type Alias: JobFilter

```ts
type JobFilter = object;
```

Defined in: [gen/types.gen.ts:3521](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3521)

Job search filter.

## Properties

### creationTime?

```ts
optional creationTime: DateTimeFilterProperty;
```

Defined in: [gen/types.gen.ts:3605](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3605)

When the job was created. Field is present for jobs created after 8.9.

---

### deadline?

```ts
optional deadline: DateTimeFilterProperty | null;
```

Defined in: [gen/types.gen.ts:3525](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3525)

When the job can next be activated.

---

### deniedReason?

```ts
optional deniedReason: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:3529](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3529)

The reason provided by the user task listener for denying the work.

---

### elementId?

```ts
optional elementId: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:3533](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3533)

The element ID associated with the job.

---

### elementInstanceKey?

```ts
optional elementInstanceKey: ElementInstanceKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:3537](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3537)

The element instance key associated with the job.

---

### endTime?

```ts
optional endTime: DateTimeFilterProperty;
```

Defined in: [gen/types.gen.ts:3541](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3541)

When the job ended.

---

### errorCode?

```ts
optional errorCode: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:3545](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3545)

The error code provided for the failed job.

---

### errorMessage?

```ts
optional errorMessage: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:3549](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3549)

The error message that provides additional context for a failed job.

---

### hasFailedWithRetriesLeft?

```ts
optional hasFailedWithRetriesLeft: boolean;
```

Defined in: [gen/types.gen.ts:3553](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3553)

Indicates whether the job has failed with retries left.

---

### isDenied?

```ts
optional isDenied: boolean | null;
```

Defined in: [gen/types.gen.ts:3557](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3557)

Indicates whether the user task listener denies the work.

---

### jobKey?

```ts
optional jobKey: JobKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:3561](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3561)

The key, a unique identifier for the job.

---

### kind?

```ts
optional kind: JobKindFilterProperty;
```

Defined in: [gen/types.gen.ts:3565](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3565)

The kind of the job.

---

### lastUpdateTime?

```ts
optional lastUpdateTime: DateTimeFilterProperty;
```

Defined in: [gen/types.gen.ts:3609](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3609)

When the job was last updated. Field is present for jobs created after 8.9.

---

### listenerEventType?

```ts
optional listenerEventType: JobListenerEventTypeFilterProperty;
```

Defined in: [gen/types.gen.ts:3569](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3569)

The listener event type of the job.

---

### processDefinitionId?

```ts
optional processDefinitionId: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:3573](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3573)

The process definition ID associated with the job.

---

### processDefinitionKey?

```ts
optional processDefinitionKey: ProcessDefinitionKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:3577](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3577)

The process definition key associated with the job.

---

### processInstanceKey?

```ts
optional processInstanceKey: ProcessInstanceKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:3581](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3581)

The process instance key associated with the job.

---

### retries?

```ts
optional retries: IntegerFilterProperty;
```

Defined in: [gen/types.gen.ts:3585](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3585)

The number of retries left.

---

### state?

```ts
optional state: JobStateFilterProperty;
```

Defined in: [gen/types.gen.ts:3589](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3589)

The state of the job.

---

### tenantId?

```ts
optional tenantId: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:3593](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3593)

The tenant ID.

---

### type?

```ts
optional type: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:3597](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3597)

The type of the job.

---

### worker?

```ts
optional worker: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:3601](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3601)

The name of the worker for this job.
