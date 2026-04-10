---
title: "Type Alias: ActivatedJobResult"
sidebar_label: "ActivatedJobResult"
mdx:
  format: md
---

# Type Alias: ActivatedJobResult

```ts
type ActivatedJobResult = object;
```

## Properties

### customHeaders

```ts
customHeaders: object;
```

A set of custom headers defined during modelling; returned as a serialized JSON document.

#### Index Signature

```ts
[key: string]: unknown
```

---

### deadline

```ts
deadline: number;
```

When the job can be activated again, sent as a UNIX epoch timestamp.

---

### elementId

```ts
elementId: ElementId;
```

The associated task element ID.

---

### elementInstanceKey

```ts
elementInstanceKey: ElementInstanceKey;
```

The element instance key of the task.

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

### listenerEventType

```ts
listenerEventType: JobListenerEventTypeEnum;
```

---

### processDefinitionId

```ts
processDefinitionId: ProcessDefinitionId;
```

The bpmn process ID of the job's process definition.

---

### processDefinitionKey

```ts
processDefinitionKey: ProcessDefinitionKey;
```

The key of the job's process definition.

---

### processDefinitionVersion

```ts
processDefinitionVersion: number;
```

The version of the job's process definition.

---

### processInstanceKey

```ts
processInstanceKey: ProcessInstanceKey;
```

The job's process instance key.

---

### retries

```ts
retries: number;
```

The amount of retries left to this job (should always be positive).

---

### rootProcessInstanceKey

```ts
rootProcessInstanceKey: ProcessInstanceKey | null;
```

The key of the root process instance. The root process instance is the top-level
ancestor in the process instance hierarchy. This field is only present for data
belonging to process instance hierarchies created in version 8.9 or later.

---

### tags

```ts
tags: TagSet;
```

---

### tenantId

```ts
tenantId: TenantId;
```

The ID of the tenant that owns the job.

---

### type

```ts
type: string;
```

The type of the job (should match what was requested).

---

### userTask

```ts
userTask: UserTaskProperties | null;
```

User task properties, if the job is a user task.
This is `null` if the job is not a user task.

---

### variables

```ts
variables: object;
```

All variables visible to the task scope, computed at activation time.

#### Index Signature

```ts
[key: string]: unknown
```

---

### worker

```ts
worker: string;
```

The name of the worker which activated this job.
