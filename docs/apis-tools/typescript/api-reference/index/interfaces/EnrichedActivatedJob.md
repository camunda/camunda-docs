---
title: "Interface: EnrichedActivatedJob"
sidebar_label: "EnrichedActivatedJob"
mdx:
  format: md
---

# Interface: EnrichedActivatedJob

Enriched job type with convenience methods.

A back-compatible **interface** so downstream consumers can declaration-merge
or `extends` it exactly as they could before the dependent-presence typing
work landed (restoring the pre-#513 public surface — turning it into a generic
type alias was a breaking change for those consumers). It resolves to the base
`ActivatedJobResult` shape plus the action methods.

The marker-driven dependent-presence projections (see
`hooks/post/710-derive-present-when.ts`) narrow individual response properties
via the generic [EnrichedActivatedJobOf](../type-aliases/EnrichedActivatedJobOf.md) companion instead of
re-parameterising this interface — an interface cannot intersect an arbitrary
type parameter, and keeping this name non-generic preserves back-compat.

## Extends

- `EnrichedActivatedJobActions`.`ActivatedJobResult`

## Properties

### acknowledged?

```ts
optional acknowledged?: boolean;
```

Set true once any acknowledgement method is invoked.

#### Inherited from

```ts
EnrichedActivatedJobActions.acknowledged;
```

---

### businessId

```ts
businessId: BusinessId | null;
```

The business ID of the owning process instance, inherited when the job was created.
This is `null` for jobs created before version 8.10 and for jobs whose owning process
instance has no business ID.

---

### clock

```ts
clock: HandlerClock;
```

The clock this worker's client resolves time through. Reading and waiting through it
means a test that pins the client's clock also drives the handler.

#### Inherited from

```ts
EnrichedActivatedJobActions.clock;
```

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

### leaseToken

```ts
leaseToken: JobLeaseToken | null;
```

The lease token identifying this activation. This is `null` when the job was activated without a lease.

---

### listenerEventType

```ts
listenerEventType: JobListenerEventTypeEnum;
```

---

### log

```ts
log: Logger;
```

#### Inherited from

```ts
EnrichedActivatedJobActions.log;
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

#### Inherited from

```ts
EnrichedActivatedJobActions.modifyJobTimeout;
```

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

#### Inherited from

```ts
EnrichedActivatedJobActions.modifyRetries;
```

---

### physicalTenantId

```ts
physicalTenantId: string;
```

The ID of the physical tenant that the job-activation request was routed to;
the default physical tenant when the request did not specify one.

---

### priority

```ts
priority: number;
```

The priority of the job. Higher values indicate higher priority. Jobs created before 8.10 have no stored priority; the API returns 0 for such jobs.

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

## Methods

### cancelWorkflow()

```ts
cancelWorkflow(): Promise<"JOB_ACTION_RECEIPT">;
```

#### Returns

`Promise`\<`"JOB_ACTION_RECEIPT"`\>

#### Inherited from

```ts
EnrichedActivatedJobActions.cancelWorkflow;
```

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

#### Inherited from

```ts
EnrichedActivatedJobActions.complete;
```

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

#### Inherited from

```ts
EnrichedActivatedJobActions.error;
```

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

#### Inherited from

```ts
EnrichedActivatedJobActions.fail;
```

---

### ignore()

```ts
ignore(): Promise<"JOB_ACTION_RECEIPT">;
```

#### Returns

`Promise`\<`"JOB_ACTION_RECEIPT"`\>

#### Inherited from

```ts
EnrichedActivatedJobActions.ignore;
```
