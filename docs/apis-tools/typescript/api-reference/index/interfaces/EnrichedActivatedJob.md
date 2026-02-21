---
title: "Interface: EnrichedActivatedJob"
sidebar_label: "EnrichedActivatedJob"
mdx:
  format: md
---

# Interface: EnrichedActivatedJob

Defined in: [runtime/jobActions.ts:10](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/runtime/jobActions.ts#L10)

Enriched job type with convenience methods.

## Extends

- `ActivatedJobResult`

## Properties

### acknowledged?

```ts
optional acknowledged: boolean;
```

Defined in: [runtime/jobActions.ts:23](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/runtime/jobActions.ts#L23)

Set true once any acknowledgement method is invoked.

---

### customHeaders

```ts
customHeaders: object;
```

Defined in: [gen/types.gen.ts:11720](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L11720)

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

Defined in: [gen/types.gen.ts:11734](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L11734)

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

Defined in: [gen/types.gen.ts:11716](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L11716)

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

Defined in: [gen/types.gen.ts:11757](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L11757)

#### Inherited from

```ts
ActivatedJobResult.elementInstanceKey;
```

---

### jobKey

```ts
jobKey: JobKey;
```

Defined in: [gen/types.gen.ts:11748](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L11748)

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

Defined in: [gen/types.gen.ts:11758](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L11758)

#### Inherited from

```ts
ActivatedJobResult.kind;
```

---

### listenerEventType

```ts
listenerEventType: JobListenerEventTypeEnum;
```

Defined in: [gen/types.gen.ts:11759](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L11759)

#### Inherited from

```ts
ActivatedJobResult.listenerEventType;
```

---

### log

```ts
log: Logger;
```

Defined in: [runtime/jobActions.ts:21](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/runtime/jobActions.ts#L21)

---

### modifyJobTimeout()

```ts
modifyJobTimeout: (__namedParameters) => Promise<void>;
```

Defined in: [runtime/jobActions.ts:19](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/runtime/jobActions.ts#L19)

Extend the timeout for the job by setting a new timeout

#### Parameters

##### \_\_namedParameters

###### newTimeoutMs

`number`

#### Returns

`Promise`\<`void`\>

---

### modifyRetries()

```ts
modifyRetries: (__namedParameters) => Promise<void>;
```

Defined in: [runtime/jobActions.ts:20](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/runtime/jobActions.ts#L20)

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

Defined in: [gen/types.gen.ts:11708](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L11708)

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

Defined in: [gen/types.gen.ts:11756](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L11756)

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

Defined in: [gen/types.gen.ts:11712](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L11712)

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

Defined in: [gen/types.gen.ts:11752](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L11752)

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

Defined in: [gen/types.gen.ts:11730](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L11730)

The amount of retries left to this job (should always be positive).

#### Inherited from

```ts
ActivatedJobResult.retries;
```

---

### tags?

```ts
optional tags: TagSet;
```

Defined in: [gen/types.gen.ts:11805](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L11805)

#### Inherited from

```ts
ActivatedJobResult.tags;
```

---

### tenantId

```ts
tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:11744](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L11744)

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

Defined in: [gen/types.gen.ts:11704](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L11704)

The type of the job (should match what was requested).

#### Inherited from

```ts
ActivatedJobResult.type;
```

---

### userTask?

```ts
optional userTask: object;
```

Defined in: [gen/types.gen.ts:11763](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L11763)

Contains properties of a user task.

#### action?

```ts
optional action: string;
```

The action performed on the user task.

#### assignee?

```ts
optional assignee: string | null;
```

The user assigned to the task.

#### candidateGroups?

```ts
optional candidateGroups: string[];
```

The groups eligible to claim the task.

#### candidateUsers?

```ts
optional candidateUsers: string[];
```

The users eligible to claim the task.

#### changedAttributes?

```ts
optional changedAttributes: string[];
```

The attributes that were changed in the task.

#### dueDate?

```ts
optional dueDate: string | null;
```

The due date of the user task in ISO 8601 format.

#### followUpDate?

```ts
optional followUpDate: string | null;
```

The follow-up date of the user task in ISO 8601 format.

#### formKey?

```ts
optional formKey: FormKey;
```

The key of the form associated with the user task.

#### priority?

```ts
optional priority: number | null;
```

The priority of the user task.

#### userTaskKey?

```ts
optional userTaskKey: UserTaskKey | null;
```

The unique key identifying the user task.

#### Inherited from

```ts
ActivatedJobResult.userTask;
```

---

### variables

```ts
variables: object;
```

Defined in: [gen/types.gen.ts:11738](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L11738)

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

Defined in: [gen/types.gen.ts:11726](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L11726)

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

Defined in: [runtime/jobActions.ts:14](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/runtime/jobActions.ts#L14)

#### Returns

`Promise`\<`"JOB_ACTION_RECEIPT"`\>

---

### complete()

```ts
complete(variables?): Promise<"JOB_ACTION_RECEIPT">;
```

Defined in: [runtime/jobActions.ts:11](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/runtime/jobActions.ts#L11)

#### Parameters

##### variables?

#### Returns

`Promise`\<`"JOB_ACTION_RECEIPT"`\>

---

### error()

```ts
error(error): Promise<"JOB_ACTION_RECEIPT">;
```

Defined in: [runtime/jobActions.ts:13](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/runtime/jobActions.ts#L13)

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

Defined in: [runtime/jobActions.ts:12](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/runtime/jobActions.ts#L12)

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

Defined in: [runtime/jobActions.ts:15](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/runtime/jobActions.ts#L15)

#### Returns

`Promise`\<`"JOB_ACTION_RECEIPT"`\>
