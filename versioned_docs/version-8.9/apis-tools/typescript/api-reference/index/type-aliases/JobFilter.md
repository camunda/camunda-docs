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
optional creationTime?: DateTimeFilterProperty;
```

When the job was created. Field is present for jobs created after 8.9.

---

### deadline?

```ts
optional deadline?: DateTimeFilterProperty | null;
```

When the job can next be activated.

---

### deniedReason?

```ts
optional deniedReason?: StringFilterProperty;
```

The reason provided by the user task listener for denying the work.

---

### elementId?

```ts
optional elementId?: StringFilterProperty;
```

The element ID associated with the job.

---

### elementInstanceKey?

```ts
optional elementInstanceKey?: ElementInstanceKeyFilterProperty;
```

The element instance key associated with the job.

---

### endTime?

```ts
optional endTime?: DateTimeFilterProperty;
```

When the job ended.

---

### errorCode?

```ts
optional errorCode?: StringFilterProperty;
```

The error code provided for the failed job.

---

### errorMessage?

```ts
optional errorMessage?: StringFilterProperty;
```

The error message that provides additional context for a failed job.

---

### hasFailedWithRetriesLeft?

```ts
optional hasFailedWithRetriesLeft?: boolean;
```

Indicates whether the job has failed with retries left.

---

### isDenied?

```ts
optional isDenied?: boolean | null;
```

Indicates whether the user task listener denies the work.

---

### jobKey?

```ts
optional jobKey?: JobKeyFilterProperty;
```

The key, a unique identifier for the job.

---

### kind?

```ts
optional kind?: JobKindFilterProperty;
```

The kind of the job.

---

### lastUpdateTime?

```ts
optional lastUpdateTime?: DateTimeFilterProperty;
```

When the job was last updated. Field is present for jobs created after 8.9.

---

### listenerEventType?

```ts
optional listenerEventType?: JobListenerEventTypeFilterProperty;
```

The listener event type of the job.

---

### processDefinitionId?

```ts
optional processDefinitionId?: StringFilterProperty;
```

The process definition ID associated with the job.

---

### processDefinitionKey?

```ts
optional processDefinitionKey?: ProcessDefinitionKeyFilterProperty;
```

The process definition key associated with the job.

---

### processInstanceKey?

```ts
optional processInstanceKey?: ProcessInstanceKeyFilterProperty;
```

The process instance key associated with the job.

---

### retries?

```ts
optional retries?: IntegerFilterProperty;
```

The number of retries left.

---

### state?

```ts
optional state?: JobStateFilterProperty;
```

The state of the job.

---

### tenantId?

```ts
optional tenantId?: StringFilterProperty;
```

The tenant ID.

---

### type?

```ts
optional type?: StringFilterProperty;
```

The type of the job.

---

### worker?

```ts
optional worker?: StringFilterProperty;
```

The name of the worker for this job.
