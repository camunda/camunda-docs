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

Defined in: [gen/types.gen.ts:4256](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4256)

## Properties

### creationTime

```ts
creationTime: string | null;
```

Defined in: [gen/types.gen.ts:4343](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4343)

When the job was created. Field is present for jobs created after 8.9.

***

### customHeaders

```ts
customHeaders: object;
```

Defined in: [gen/types.gen.ts:4260](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4260)

A set of custom headers defined during modelling.

#### Index Signature

```ts
[key: string]: string
```

***

### deadline

```ts
deadline: string | null;
```

Defined in: [gen/types.gen.ts:4266](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4266)

If the job has been activated, when it will next be available to be activated.

***

### deniedReason

```ts
deniedReason: string | null;
```

Defined in: [gen/types.gen.ts:4270](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4270)

The reason provided by the user task listener for denying the work.

***

### elementId

```ts
elementId: ElementId | null;
```

Defined in: [gen/types.gen.ts:4274](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4274)

The element ID associated with the job. May be missing on job failure.

***

### elementInstanceKey

```ts
elementInstanceKey: ElementInstanceKey;
```

Defined in: [gen/types.gen.ts:4278](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4278)

The element instance key associated with the job.

***

### endTime

```ts
endTime: string | null;
```

Defined in: [gen/types.gen.ts:4284](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4284)

End date of the job.
This is `null` if the job is not in an end state yet.

***

### errorCode

```ts
errorCode: string | null;
```

Defined in: [gen/types.gen.ts:4288](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4288)

The error code provided for a failed job.

***

### errorMessage

```ts
errorMessage: string | null;
```

Defined in: [gen/types.gen.ts:4292](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4292)

The error message that provides additional context for a failed job.

***

### hasFailedWithRetriesLeft

```ts
hasFailedWithRetriesLeft: boolean;
```

Defined in: [gen/types.gen.ts:4296](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4296)

Indicates whether the job has failed with retries left.

***

### isDenied

```ts
isDenied: boolean | null;
```

Defined in: [gen/types.gen.ts:4300](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4300)

Indicates whether the user task listener denies the work.

***

### jobKey

```ts
jobKey: JobKey;
```

Defined in: [gen/types.gen.ts:4304](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4304)

The key, a unique identifier for the job.

***

### kind

```ts
kind: JobKindEnum;
```

Defined in: [gen/types.gen.ts:4305](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4305)

***

### lastUpdateTime

```ts
lastUpdateTime: string | null;
```

Defined in: [gen/types.gen.ts:4347](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4347)

When the job was last updated. Field is present for jobs created after 8.9.

***

### listenerEventType

```ts
listenerEventType: JobListenerEventTypeEnum;
```

Defined in: [gen/types.gen.ts:4306](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4306)

***

### processDefinitionId

```ts
processDefinitionId: ProcessDefinitionId;
```

Defined in: [gen/types.gen.ts:4310](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4310)

The process definition ID associated with the job.

***

### processDefinitionKey

```ts
processDefinitionKey: ProcessDefinitionKey;
```

Defined in: [gen/types.gen.ts:4314](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4314)

The process definition key associated with the job.

***

### processInstanceKey

```ts
processInstanceKey: ProcessInstanceKey;
```

Defined in: [gen/types.gen.ts:4318](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4318)

The process instance key associated with the job.

***

### retries

```ts
retries: number;
```

Defined in: [gen/types.gen.ts:4329](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4329)

The amount of retries left to this job.

***

### rootProcessInstanceKey

```ts
rootProcessInstanceKey: ProcessInstanceKey | null;
```

Defined in: [gen/types.gen.ts:4325](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4325)

The key of the root process instance. The root process instance is the top-level
ancestor in the process instance hierarchy. This field is only present for data
belonging to process instance hierarchies created in version 8.9 or later.

***

### state

```ts
state: JobStateEnum;
```

Defined in: [gen/types.gen.ts:4330](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4330)

***

### tenantId

```ts
tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:4331](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4331)

***

### type

```ts
type: string;
```

Defined in: [gen/types.gen.ts:4335](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4335)

The type of the job.

***

### worker

```ts
worker: string;
```

Defined in: [gen/types.gen.ts:4339](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4339)

The name of the worker of this job.
