---
title: "Interface: EnrichedActivatedJob"
sidebar_label: "EnrichedActivatedJob"
mdx:
  format: md
---

# Interface: EnrichedActivatedJob

Defined in: [runtime/jobActions.ts:10](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/runtime/jobActions.ts#L10)

Enriched job type with convenience methods.

## Extends

- `ActivatedJobResult`

## Properties

### acknowledged?

```ts
optional acknowledged: boolean;
```

Defined in: [runtime/jobActions.ts:23](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/runtime/jobActions.ts#L23)

Set true once any acknowledgement method is invoked.

***

### customHeaders

```ts
customHeaders: object;
```

Defined in: [gen/types.gen.ts:3957](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L3957)

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

Defined in: [gen/types.gen.ts:3971](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L3971)

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

Defined in: [gen/types.gen.ts:3953](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L3953)

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

Defined in: [gen/types.gen.ts:3997](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L3997)

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

Defined in: [gen/types.gen.ts:3985](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L3985)

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

Defined in: [gen/types.gen.ts:3998](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L3998)

#### Inherited from

```ts
ActivatedJobResult.kind
```

***

### listenerEventType

```ts
listenerEventType: JobListenerEventTypeEnum;
```

Defined in: [gen/types.gen.ts:3999](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L3999)

#### Inherited from

```ts
ActivatedJobResult.listenerEventType
```

***

### log

```ts
log: Logger;
```

Defined in: [runtime/jobActions.ts:21](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/runtime/jobActions.ts#L21)

***

### modifyJobTimeout()

```ts
modifyJobTimeout: (__namedParameters) => Promise<void>;
```

Defined in: [runtime/jobActions.ts:19](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/runtime/jobActions.ts#L19)

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

Defined in: [runtime/jobActions.ts:20](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/runtime/jobActions.ts#L20)

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

Defined in: [gen/types.gen.ts:3945](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L3945)

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

Defined in: [gen/types.gen.ts:3993](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L3993)

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

Defined in: [gen/types.gen.ts:3949](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L3949)

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

Defined in: [gen/types.gen.ts:3989](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L3989)

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

Defined in: [gen/types.gen.ts:3967](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L3967)

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

Defined in: [gen/types.gen.ts:4013](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4013)

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

Defined in: [gen/types.gen.ts:4006](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4006)

#### Inherited from

```ts
ActivatedJobResult.tags
```

***

### tenantId

```ts
tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:3981](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L3981)

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

Defined in: [gen/types.gen.ts:3941](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L3941)

The type of the job (should match what was requested).

#### Inherited from

```ts
ActivatedJobResult.type
```

***

### userTask?

```ts
optional userTask: UserTaskProperties | null;
```

Defined in: [gen/types.gen.ts:4005](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4005)

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

Defined in: [gen/types.gen.ts:3975](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L3975)

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

Defined in: [gen/types.gen.ts:3963](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L3963)

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

Defined in: [runtime/jobActions.ts:14](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/runtime/jobActions.ts#L14)

#### Returns

`Promise`\<`"JOB_ACTION_RECEIPT"`\>

***

### complete()

```ts
complete(variables?): Promise<"JOB_ACTION_RECEIPT">;
```

Defined in: [runtime/jobActions.ts:11](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/runtime/jobActions.ts#L11)

#### Parameters

##### variables?

#### Returns

`Promise`\<`"JOB_ACTION_RECEIPT"`\>

***

### error()

```ts
error(error): Promise<"JOB_ACTION_RECEIPT">;
```

Defined in: [runtime/jobActions.ts:13](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/runtime/jobActions.ts#L13)

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

Defined in: [runtime/jobActions.ts:12](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/runtime/jobActions.ts#L12)

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

Defined in: [runtime/jobActions.ts:15](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/runtime/jobActions.ts#L15)

#### Returns

`Promise`\<`"JOB_ACTION_RECEIPT"`\>
