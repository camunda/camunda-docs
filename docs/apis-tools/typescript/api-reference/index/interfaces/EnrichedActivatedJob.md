---
title: "Interface: EnrichedActivatedJob"
sidebar_label: "EnrichedActivatedJob"
mdx:
  format: md
---

# Interface: EnrichedActivatedJob

Defined in: [runtime/jobActions.ts:10](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/runtime/jobActions.ts#L10)

Enriched job type with convenience methods.

## Extends

- `ActivatedJobResult`

## Properties

### acknowledged?

```ts
optional acknowledged: boolean;
```

Defined in: [runtime/jobActions.ts:23](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/runtime/jobActions.ts#L23)

Set true once any acknowledgement method is invoked.

***

### customHeaders

```ts
customHeaders: object;
```

Defined in: [gen/types.gen.ts:4025](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4025)

A set of custom headers defined during modelling; returned as a serialized JSON document.

#### Index Signature

```ts
[key: string]: unknown
```

#### Inherited from

```ts
ActivatedJobResult.customHeaders
```

***

### deadline

```ts
deadline: number;
```

Defined in: [gen/types.gen.ts:4039](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4039)

When the job can be activated again, sent as a UNIX epoch timestamp.

#### Inherited from

```ts
ActivatedJobResult.deadline
```

***

### elementId

```ts
elementId: ElementId;
```

Defined in: [gen/types.gen.ts:4021](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4021)

The associated task element ID.

#### Inherited from

```ts
ActivatedJobResult.elementId
```

***

### elementInstanceKey

```ts
elementInstanceKey: ElementInstanceKey;
```

Defined in: [gen/types.gen.ts:4065](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4065)

The element instance key of the task.

#### Inherited from

```ts
ActivatedJobResult.elementInstanceKey
```

***

### jobKey

```ts
jobKey: JobKey;
```

Defined in: [gen/types.gen.ts:4053](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4053)

The key, a unique identifier for the job.

#### Inherited from

```ts
ActivatedJobResult.jobKey
```

***

### kind

```ts
kind: JobKindEnum;
```

Defined in: [gen/types.gen.ts:4066](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4066)

#### Inherited from

```ts
ActivatedJobResult.kind
```

***

### listenerEventType

```ts
listenerEventType: JobListenerEventTypeEnum;
```

Defined in: [gen/types.gen.ts:4067](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4067)

#### Inherited from

```ts
ActivatedJobResult.listenerEventType
```

***

### log

```ts
log: Logger;
```

Defined in: [runtime/jobActions.ts:21](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/runtime/jobActions.ts#L21)

***

### modifyJobTimeout()

```ts
modifyJobTimeout: (__namedParameters) => Promise<void>;
```

Defined in: [runtime/jobActions.ts:19](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/runtime/jobActions.ts#L19)

Extend the timeout for the job by setting a new timeout

#### Parameters

##### \_\_namedParameters

###### newTimeoutMs

`number`

#### Returns

`Promise`\<`void`\>

***

### modifyRetries()

```ts
modifyRetries: (__namedParameters) => Promise<void>;
```

Defined in: [runtime/jobActions.ts:20](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/runtime/jobActions.ts#L20)

#### Parameters

##### \_\_namedParameters

###### retries

`number`

#### Returns

`Promise`\<`void`\>

***

### processDefinitionId

```ts
processDefinitionId: ProcessDefinitionId;
```

Defined in: [gen/types.gen.ts:4013](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4013)

The bpmn process ID of the job's process definition.

#### Inherited from

```ts
ActivatedJobResult.processDefinitionId
```

***

### processDefinitionKey

```ts
processDefinitionKey: ProcessDefinitionKey;
```

Defined in: [gen/types.gen.ts:4061](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4061)

The key of the job's process definition.

#### Inherited from

```ts
ActivatedJobResult.processDefinitionKey
```

***

### processDefinitionVersion

```ts
processDefinitionVersion: number;
```

Defined in: [gen/types.gen.ts:4017](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4017)

The version of the job's process definition.

#### Inherited from

```ts
ActivatedJobResult.processDefinitionVersion
```

***

### processInstanceKey

```ts
processInstanceKey: ProcessInstanceKey;
```

Defined in: [gen/types.gen.ts:4057](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4057)

The job's process instance key.

#### Inherited from

```ts
ActivatedJobResult.processInstanceKey
```

***

### retries

```ts
retries: number;
```

Defined in: [gen/types.gen.ts:4035](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4035)

The amount of retries left to this job (should always be positive).

#### Inherited from

```ts
ActivatedJobResult.retries
```

***

### rootProcessInstanceKey

```ts
rootProcessInstanceKey: ProcessInstanceKey | null;
```

Defined in: [gen/types.gen.ts:4081](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4081)

The key of the root process instance. The root process instance is the top-level
ancestor in the process instance hierarchy. This field is only present for data
belonging to process instance hierarchies created in version 8.9 or later.

#### Inherited from

```ts
ActivatedJobResult.rootProcessInstanceKey
```

***

### tags

```ts
tags: TagSet;
```

Defined in: [gen/types.gen.ts:4074](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4074)

#### Inherited from

```ts
ActivatedJobResult.tags
```

***

### tenantId

```ts
tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:4049](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4049)

The ID of the tenant that owns the job.

#### Inherited from

```ts
ActivatedJobResult.tenantId
```

***

### type

```ts
type: string;
```

Defined in: [gen/types.gen.ts:4009](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4009)

The type of the job (should match what was requested).

#### Inherited from

```ts
ActivatedJobResult.type
```

***

### userTask

```ts
userTask: UserTaskProperties | null;
```

Defined in: [gen/types.gen.ts:4073](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4073)

User task properties, if the job is a user task.
This is `null` if the job is not a user task.

#### Inherited from

```ts
ActivatedJobResult.userTask
```

***

### variables

```ts
variables: object;
```

Defined in: [gen/types.gen.ts:4043](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4043)

All variables visible to the task scope, computed at activation time.

#### Index Signature

```ts
[key: string]: unknown
```

#### Inherited from

```ts
ActivatedJobResult.variables
```

***

### worker

```ts
worker: string;
```

Defined in: [gen/types.gen.ts:4031](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4031)

The name of the worker which activated this job.

#### Inherited from

```ts
ActivatedJobResult.worker
```

## Methods

### cancelWorkflow()

```ts
cancelWorkflow(): Promise<"JOB_ACTION_RECEIPT">;
```

Defined in: [runtime/jobActions.ts:14](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/runtime/jobActions.ts#L14)

#### Returns

`Promise`\<`"JOB_ACTION_RECEIPT"`\>

***

### complete()

```ts
complete(variables?): Promise<"JOB_ACTION_RECEIPT">;
```

Defined in: [runtime/jobActions.ts:11](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/runtime/jobActions.ts#L11)

#### Parameters

##### variables?

#### Returns

`Promise`\<`"JOB_ACTION_RECEIPT"`\>

***

### error()

```ts
error(error): Promise<"JOB_ACTION_RECEIPT">;
```

Defined in: [runtime/jobActions.ts:13](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/runtime/jobActions.ts#L13)

#### Parameters

##### error

[`JobErrorRequest`](../type-aliases/JobErrorRequest.md)

#### Returns

`Promise`\<`"JOB_ACTION_RECEIPT"`\>

***

### fail()

```ts
fail(body): Promise<"JOB_ACTION_RECEIPT">;
```

Defined in: [runtime/jobActions.ts:12](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/runtime/jobActions.ts#L12)

#### Parameters

##### body

`any`

#### Returns

`Promise`\<`"JOB_ACTION_RECEIPT"`\>

***

### ignore()

```ts
ignore(): Promise<"JOB_ACTION_RECEIPT">;
```

Defined in: [runtime/jobActions.ts:15](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/runtime/jobActions.ts#L15)

#### Returns

`Promise`\<`"JOB_ACTION_RECEIPT"`\>
