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

## Properties

### creationTime

```ts
creationTime: string | null;
```

When the job was created. Field is present for jobs created after 8.9.

---

### customHeaders

```ts
customHeaders: object;
```

A set of custom headers defined during modelling.

#### Index Signature

```ts
[key: string]: string
```

---

### deadline

```ts
deadline: string | null;
```

If the job has been activated, when it will next be available to be activated.

---

### deniedReason

```ts
deniedReason: string | null;
```

The reason provided by the user task listener for denying the work.

---

### elementId

```ts
elementId: ElementId | null;
```

The element ID associated with the job. May be missing on job failure.

---

### elementInstanceKey

```ts
elementInstanceKey: ElementInstanceKey;
```

The element instance key associated with the job.

---

### endTime

```ts
endTime: string | null;
```

End date of the job.
This is `null` if the job is not in an end state yet.

---

### errorCode

```ts
errorCode: string | null;
```

The error code provided for a failed job.

---

### errorMessage

```ts
errorMessage: string | null;
```

The error message that provides additional context for a failed job.

---

### hasFailedWithRetriesLeft

```ts
hasFailedWithRetriesLeft: boolean;
```

Indicates whether the job has failed with retries left.

---

### isDenied

```ts
isDenied: boolean | null;
```

Indicates whether the user task listener denies the work.

---

### jobKey

```ts
jobKey: JobKey;
```

The key, a unique identifier for the job.

---

### kind

```ts
kind: JobKindEnum;
```

---

### lastUpdateTime

```ts
lastUpdateTime: string | null;
```

When the job was last updated. Field is present for jobs created after 8.9.

---

### listenerEventType

```ts
listenerEventType: JobListenerEventTypeEnum;
```

---

### processDefinitionId

```ts
processDefinitionId: ProcessDefinitionId;
```

The process definition ID associated with the job.

---

### processDefinitionKey

```ts
processDefinitionKey: ProcessDefinitionKey;
```

The process definition key associated with the job.

---

### processInstanceKey

```ts
processInstanceKey: ProcessInstanceKey;
```

The process instance key associated with the job.

---

### retries

```ts
retries: number;
```

The amount of retries left to this job.

---

### rootProcessInstanceKey

```ts
rootProcessInstanceKey: ProcessInstanceKey | null;
```

The key of the root process instance. The root process instance is the top-level
ancestor in the process instance hierarchy. This field is only present for data
belonging to process instance hierarchies created in version 8.9 or later.

---

### state

```ts
state: JobStateEnum;
```

---

### tenantId

```ts
tenantId: TenantId;
```

---

### type

```ts
type: string;
```

The type of the job.

---

### worker

```ts
worker: string;
```

The name of the worker of this job.
