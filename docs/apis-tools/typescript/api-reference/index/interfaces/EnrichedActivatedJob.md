---
title: "Interface: EnrichedActivatedJob"
sidebar_label: "EnrichedActivatedJob"
mdx:
  format: md
---

# Interface: EnrichedActivatedJob

Enriched job type with convenience methods.

## Extends

- `ActivatedJobResult`

## Properties

### acknowledged?

```ts
optional acknowledged?: boolean;
```

Set true once any acknowledgement method is invoked.

---

### customHeaders

```ts
customHeaders: object;
```

A set of custom headers defined during modelling; returned as a serialized JSON document.

#### Index Signature

```ts
[key: string]: unknown
```

#### Inherited from

```ts
ActivatedJobResult.customHeaders;
```

---

### deadline

```ts
deadline: number;
```

When the job can be activated again, sent as a UNIX epoch timestamp.

#### Inherited from

```ts
ActivatedJobResult.deadline;
```

---

### elementId

```ts
elementId: ElementId;
```

The associated task element ID.

#### Inherited from

```ts
ActivatedJobResult.elementId;
```

---

### elementInstanceKey

```ts
elementInstanceKey: ElementInstanceKey;
```

The element instance key of the task.

#### Inherited from

```ts
ActivatedJobResult.elementInstanceKey;
```

---

### jobKey

```ts
jobKey: JobKey;
```

The key, a unique identifier for the job.

#### Inherited from

```ts
ActivatedJobResult.jobKey;
```

---

### kind

```ts
kind: JobKindEnum;
```

#### Inherited from

```ts
ActivatedJobResult.kind;
```

---

### listenerEventType

```ts
listenerEventType: JobListenerEventTypeEnum;
```

#### Inherited from

```ts
ActivatedJobResult.listenerEventType;
```

---

### log

```ts
log: Logger;
```

---

### modifyJobTimeout

```ts
modifyJobTimeout: (__namedParameters) => Promise<void>;
```

Extend the timeout for the job by setting a new timeout

#### Parameters

##### \_\_namedParameters

###### newTimeoutMs

`number`

#### Returns

`Promise`\<`void`\>

---

### modifyRetries

```ts
modifyRetries: (__namedParameters) => Promise<void>;
```

#### Parameters

##### \_\_namedParameters

###### retries

`number`

#### Returns

`Promise`\<`void`\>

---

### processDefinitionId

```ts
processDefinitionId: ProcessDefinitionId;
```

The bpmn process ID of the job's process definition.

#### Inherited from

```ts
ActivatedJobResult.processDefinitionId;
```

---

### processDefinitionKey

```ts
processDefinitionKey: ProcessDefinitionKey;
```

The key of the job's process definition.

#### Inherited from

```ts
ActivatedJobResult.processDefinitionKey;
```

---

### processDefinitionVersion

```ts
processDefinitionVersion: number;
```

The version of the job's process definition.

#### Inherited from

```ts
ActivatedJobResult.processDefinitionVersion;
```

---

### processInstanceKey

```ts
processInstanceKey: ProcessInstanceKey;
```

The job's process instance key.

#### Inherited from

```ts
ActivatedJobResult.processInstanceKey;
```

---

### retries

```ts
retries: number;
```

The amount of retries left to this job (should always be positive).

#### Inherited from

```ts
ActivatedJobResult.retries;
```

---

### rootProcessInstanceKey

```ts
rootProcessInstanceKey: ProcessInstanceKey | null;
```

The key of the root process instance. The root process instance is the top-level
ancestor in the process instance hierarchy. This field is only present for data
belonging to process instance hierarchies created in version 8.9 or later.

#### Inherited from

```ts
ActivatedJobResult.rootProcessInstanceKey;
```

---

### tags

```ts
tags: TagSet;
```

#### Inherited from

```ts
ActivatedJobResult.tags;
```

---

### tenantId

```ts
tenantId: TenantId;
```

The ID of the tenant that owns the job.

#### Inherited from

```ts
ActivatedJobResult.tenantId;
```

---

### type

```ts
type: string;
```

The type of the job (should match what was requested).

#### Inherited from

```ts
ActivatedJobResult.type;
```

---

### userTask

```ts
userTask: UserTaskProperties | null;
```

User task properties, if the job is a user task.
This is `null` if the job is not a user task.

#### Inherited from

```ts
ActivatedJobResult.userTask;
```

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

#### Inherited from

```ts
ActivatedJobResult.variables;
```

---

### worker

```ts
worker: string;
```

The name of the worker which activated this job.

#### Inherited from

```ts
ActivatedJobResult.worker;
```

## Methods

### cancelWorkflow()

```ts
cancelWorkflow(): Promise<"JOB_ACTION_RECEIPT">;
```

#### Returns

`Promise`\<`"JOB_ACTION_RECEIPT"`\>

---

### complete()

```ts
complete(variables?, result?): Promise<"JOB_ACTION_RECEIPT">;
```

#### Parameters

##### variables?

##### result?

[`JobResult`](../type-aliases/JobResult.md)

#### Returns

`Promise`\<`"JOB_ACTION_RECEIPT"`\>

---

### error()

```ts
error(error): Promise<"JOB_ACTION_RECEIPT">;
```

#### Parameters

##### error

[`JobErrorRequest`](../type-aliases/JobErrorRequest.md)

#### Returns

`Promise`\<`"JOB_ACTION_RECEIPT"`\>

---

### fail()

```ts
fail(body): Promise<"JOB_ACTION_RECEIPT">;
```

#### Parameters

##### body

`any`

#### Returns

`Promise`\<`"JOB_ACTION_RECEIPT"`\>

---

### ignore()

```ts
ignore(): Promise<"JOB_ACTION_RECEIPT">;
```

#### Returns

`Promise`\<`"JOB_ACTION_RECEIPT"`\>
