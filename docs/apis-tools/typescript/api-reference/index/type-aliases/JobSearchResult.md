---
title: "Type Alias: JobSearchResult"
sidebar_label: "JobSearchResult"
mdx:
  format: md
---

# Type Alias: JobSearchResult

```ts
type JobSearchResult = object;
```

Defined in: [gen/types.gen.ts:3622](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3622)

## Properties

### creationTime?

```ts
optional creationTime: string;
```

Defined in: [gen/types.gen.ts:3701](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3701)

When the job was created. Field is present for jobs created after 8.9.

---

### customHeaders

```ts
customHeaders: object;
```

Defined in: [gen/types.gen.ts:3626](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3626)

A set of custom headers defined during modelling.

#### Index Signature

```ts
[key: string]: string
```

---

### deadline?

```ts
optional deadline: string | null;
```

Defined in: [gen/types.gen.ts:3632](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3632)

If the job has been activated, when it will next be available to be activated.

---

### deniedReason?

```ts
optional deniedReason: string | null;
```

Defined in: [gen/types.gen.ts:3636](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3636)

The reason provided by the user task listener for denying the work.

---

### elementId

```ts
elementId: ElementId;
```

Defined in: [gen/types.gen.ts:3640](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3640)

The element ID associated with the job.

---

### elementInstanceKey

```ts
elementInstanceKey: ElementInstanceKey;
```

Defined in: [gen/types.gen.ts:3644](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3644)

The element instance key associated with the job.

---

### endTime?

```ts
optional endTime: string;
```

Defined in: [gen/types.gen.ts:3648](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3648)

When the job ended.

---

### errorCode?

```ts
optional errorCode: string | null;
```

Defined in: [gen/types.gen.ts:3652](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3652)

The error code provided for a failed job.

---

### errorMessage?

```ts
optional errorMessage: string | null;
```

Defined in: [gen/types.gen.ts:3656](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3656)

The error message that provides additional context for a failed job.

---

### hasFailedWithRetriesLeft

```ts
hasFailedWithRetriesLeft: boolean;
```

Defined in: [gen/types.gen.ts:3660](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3660)

Indicates whether the job has failed with retries left.

---

### isDenied?

```ts
optional isDenied: boolean | null;
```

Defined in: [gen/types.gen.ts:3664](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3664)

Indicates whether the user task listener denies the work.

---

### jobKey

```ts
jobKey: JobKey;
```

Defined in: [gen/types.gen.ts:3668](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3668)

The key, a unique identifier for the job.

---

### kind

```ts
kind: JobKindEnum;
```

Defined in: [gen/types.gen.ts:3669](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3669)

---

### lastUpdateTime?

```ts
optional lastUpdateTime: string;
```

Defined in: [gen/types.gen.ts:3705](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3705)

When the job was last updated. Field is present for jobs created after 8.9.

---

### listenerEventType

```ts
listenerEventType: JobListenerEventTypeEnum;
```

Defined in: [gen/types.gen.ts:3670](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3670)

---

### processDefinitionId

```ts
processDefinitionId: ProcessDefinitionId;
```

Defined in: [gen/types.gen.ts:3674](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3674)

The process definition ID associated with the job.

---

### processDefinitionKey

```ts
processDefinitionKey: ProcessDefinitionKey;
```

Defined in: [gen/types.gen.ts:3678](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3678)

The process definition key associated with the job.

---

### processInstanceKey

```ts
processInstanceKey: ProcessInstanceKey;
```

Defined in: [gen/types.gen.ts:3682](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3682)

The process instance key associated with the job.

---

### retries

```ts
retries: number;
```

Defined in: [gen/types.gen.ts:3687](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3687)

The amount of retries left to this job.

---

### rootProcessInstanceKey?

```ts
optional rootProcessInstanceKey: RootProcessInstanceKey;
```

Defined in: [gen/types.gen.ts:3683](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3683)

---

### state

```ts
state: JobStateEnum;
```

Defined in: [gen/types.gen.ts:3688](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3688)

---

### tenantId

```ts
tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:3689](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3689)

---

### type

```ts
type: string;
```

Defined in: [gen/types.gen.ts:3693](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3693)

The type of the job.

---

### worker

```ts
worker: string;
```

Defined in: [gen/types.gen.ts:3697](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3697)

The name of the worker of this job.
