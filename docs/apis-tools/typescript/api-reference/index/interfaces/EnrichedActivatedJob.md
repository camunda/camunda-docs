---
title: "Interface: EnrichedActivatedJob"
sidebar_label: "EnrichedActivatedJob"
mdx:
  format: md
---

# Interface: EnrichedActivatedJob

Defined in: [runtime/jobActions.ts:9](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/runtime/jobActions.ts#L9)

Enriched job type with convenience methods.

## Extends

- `ActivatedJobResult`

## Properties

### acknowledged?

```ts
optional acknowledged?: boolean;
```

Defined in: [runtime/jobActions.ts:22](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/runtime/jobActions.ts#L22)

Set true once any acknowledgement method is invoked.

---

### customHeaders

```ts
customHeaders: object;
```

Defined in: [gen/types.gen.ts:4028](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4028)

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

Defined in: [gen/types.gen.ts:4042](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4042)

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

Defined in: [gen/types.gen.ts:4024](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4024)

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

Defined in: [gen/types.gen.ts:4068](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4068)

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

Defined in: [gen/types.gen.ts:4056](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4056)

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

Defined in: [gen/types.gen.ts:4069](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4069)

#### Inherited from

```ts
ActivatedJobResult.kind;
```

---

### listenerEventType

```ts
listenerEventType: JobListenerEventTypeEnum;
```

Defined in: [gen/types.gen.ts:4070](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4070)

#### Inherited from

```ts
ActivatedJobResult.listenerEventType;
```

---

### log

```ts
log: Logger;
```

Defined in: [runtime/jobActions.ts:20](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/runtime/jobActions.ts#L20)

---

### modifyJobTimeout

```ts
modifyJobTimeout: (__namedParameters) => Promise<void>;
```

Defined in: [runtime/jobActions.ts:18](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/runtime/jobActions.ts#L18)

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

Defined in: [runtime/jobActions.ts:19](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/runtime/jobActions.ts#L19)

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

Defined in: [gen/types.gen.ts:4016](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4016)

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

Defined in: [gen/types.gen.ts:4064](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4064)

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

Defined in: [gen/types.gen.ts:4020](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4020)

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

Defined in: [gen/types.gen.ts:4060](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4060)

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

Defined in: [gen/types.gen.ts:4038](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4038)

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

Defined in: [gen/types.gen.ts:4084](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4084)

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

Defined in: [gen/types.gen.ts:4077](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4077)

#### Inherited from

```ts
ActivatedJobResult.tags;
```

---

### tenantId

```ts
tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:4052](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4052)

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

Defined in: [gen/types.gen.ts:4012](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4012)

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

Defined in: [gen/types.gen.ts:4076](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4076)

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

Defined in: [gen/types.gen.ts:4046](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4046)

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

Defined in: [gen/types.gen.ts:4034](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4034)

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

Defined in: [runtime/jobActions.ts:13](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/runtime/jobActions.ts#L13)

#### Returns

`Promise`\<`"JOB_ACTION_RECEIPT"`\>

---

### complete()

```ts
complete(variables?, result?): Promise<"JOB_ACTION_RECEIPT">;
```

Defined in: [runtime/jobActions.ts:10](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/runtime/jobActions.ts#L10)

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

Defined in: [runtime/jobActions.ts:12](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/runtime/jobActions.ts#L12)

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

Defined in: [runtime/jobActions.ts:11](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/runtime/jobActions.ts#L11)

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

Defined in: [runtime/jobActions.ts:14](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/runtime/jobActions.ts#L14)

#### Returns

`Promise`\<`"JOB_ACTION_RECEIPT"`\>
