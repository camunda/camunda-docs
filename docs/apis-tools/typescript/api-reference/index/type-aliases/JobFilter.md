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

Job search filter.

## Properties

### creationTime?

```ts
creationTime?: DateTimeFilterProperty;
```

When the job was created. Field is present for jobs created after 8.9.

---

### deadline?

```ts
deadline?: DateTimeFilterProperty | null;
```

When the job can next be activated.

---

### deniedReason?

```ts
deniedReason?: StringFilterProperty;
```

The reason provided by the user task listener for denying the work.

---

### elementId?

```ts
elementId?: StringFilterProperty;
```

The element ID associated with the job.

---

### elementInstanceKey?

```ts
elementInstanceKey?: ElementInstanceKeyFilterProperty;
```

The element instance key associated with the job.

---

### endTime?

```ts
endTime?: DateTimeFilterProperty;
```

When the job ended.

---

### errorCode?

```ts
errorCode?: StringFilterProperty;
```

The error code provided for the failed job.

---

### errorMessage?

```ts
errorMessage?: StringFilterProperty;
```

The error message that provides additional context for a failed job.

---

### hasFailedWithRetriesLeft?

```ts
hasFailedWithRetriesLeft?: boolean;
```

Indicates whether the job has failed with retries left.

---

### isDenied?

```ts
isDenied?: boolean | null;
```

Indicates whether the user task listener denies the work.

---

### jobKey?

```ts
jobKey?: JobKeyFilterProperty;
```

The key, a unique identifier for the job.

---

### kind?

```ts
kind?: JobKindFilterProperty;
```

The kind of the job.

---

### lastUpdateTime?

```ts
lastUpdateTime?: DateTimeFilterProperty;
```

When the job was last updated. Field is present for jobs created after 8.9.

---

### listenerEventType?

```ts
listenerEventType?: JobListenerEventTypeFilterProperty;
```

The listener event type of the job.

---

### priority?

```ts
priority?: IntegerFilterProperty;
```

The priority of the job. Jobs created before 8.10 have no stored priority and are excluded from results when this filter is applied.

---

### processDefinitionId?

```ts
processDefinitionId?: StringFilterProperty;
```

The process definition ID associated with the job.

---

### processDefinitionKey?

```ts
processDefinitionKey?: ProcessDefinitionKeyFilterProperty;
```

The process definition key associated with the job.

---

### processInstanceKey?

```ts
processInstanceKey?: ProcessInstanceKeyFilterProperty;
```

The process instance key associated with the job.

---

### retries?

```ts
retries?: IntegerFilterProperty;
```

The number of retries left.

---

### state?

```ts
state?: JobStateFilterProperty;
```

The state of the job.

---

### tenantId?

```ts
tenantId?: StringFilterProperty;
```

The tenant ID.

---

### type?

```ts
type?: StringFilterProperty;
```

The type of the job.

---

### worker?

```ts
worker?: StringFilterProperty;
```

The name of the worker for this job.
