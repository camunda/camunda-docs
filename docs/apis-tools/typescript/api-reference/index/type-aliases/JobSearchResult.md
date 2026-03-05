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

Defined in: [gen/types.gen.ts:4188](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4188)

## Properties

### creationTime?

```ts
optional creationTime: string;
```

Defined in: [gen/types.gen.ts:4275](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4275)

When the job was created. Field is present for jobs created after 8.9.

***

### customHeaders

```ts
customHeaders: object;
```

Defined in: [gen/types.gen.ts:4192](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4192)

A set of custom headers defined during modelling.

#### Index Signature

```ts
[key: string]: string
```

***

### deadline?

```ts
optional deadline: string | null;
```

Defined in: [gen/types.gen.ts:4198](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4198)

If the job has been activated, when it will next be available to be activated.

***

### deniedReason?

```ts
optional deniedReason: string | null;
```

Defined in: [gen/types.gen.ts:4202](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4202)

The reason provided by the user task listener for denying the work.

***

### elementId

```ts
elementId: ElementId | null;
```

Defined in: [gen/types.gen.ts:4206](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4206)

The element ID associated with the job. May be missing on job failure.

***

### elementInstanceKey

```ts
elementInstanceKey: ElementInstanceKey;
```

Defined in: [gen/types.gen.ts:4210](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4210)

The element instance key associated with the job.

***

### endTime?

```ts
optional endTime: string | null;
```

Defined in: [gen/types.gen.ts:4216](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4216)

End date of the job.
This is `null` if the job is not in an end state yet.

***

### errorCode?

```ts
optional errorCode: string | null;
```

Defined in: [gen/types.gen.ts:4220](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4220)

The error code provided for a failed job.

***

### errorMessage?

```ts
optional errorMessage: string | null;
```

Defined in: [gen/types.gen.ts:4224](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4224)

The error message that provides additional context for a failed job.

***

### hasFailedWithRetriesLeft

```ts
hasFailedWithRetriesLeft: boolean;
```

Defined in: [gen/types.gen.ts:4228](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4228)

Indicates whether the job has failed with retries left.

***

### isDenied?

```ts
optional isDenied: boolean | null;
```

Defined in: [gen/types.gen.ts:4232](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4232)

Indicates whether the user task listener denies the work.

***

### jobKey

```ts
jobKey: JobKey;
```

Defined in: [gen/types.gen.ts:4236](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4236)

The key, a unique identifier for the job.

***

### kind

```ts
kind: JobKindEnum;
```

Defined in: [gen/types.gen.ts:4237](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4237)

***

### lastUpdateTime?

```ts
optional lastUpdateTime: string;
```

Defined in: [gen/types.gen.ts:4279](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4279)

When the job was last updated. Field is present for jobs created after 8.9.

***

### listenerEventType

```ts
listenerEventType: JobListenerEventTypeEnum;
```

Defined in: [gen/types.gen.ts:4238](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4238)

***

### processDefinitionId

```ts
processDefinitionId: ProcessDefinitionId;
```

Defined in: [gen/types.gen.ts:4242](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4242)

The process definition ID associated with the job.

***

### processDefinitionKey

```ts
processDefinitionKey: ProcessDefinitionKey;
```

Defined in: [gen/types.gen.ts:4246](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4246)

The process definition key associated with the job.

***

### processInstanceKey

```ts
processInstanceKey: ProcessInstanceKey;
```

Defined in: [gen/types.gen.ts:4250](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4250)

The process instance key associated with the job.

***

### retries

```ts
retries: number;
```

Defined in: [gen/types.gen.ts:4261](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4261)

The amount of retries left to this job.

***

### rootProcessInstanceKey

```ts
rootProcessInstanceKey: ProcessInstanceKey | null;
```

Defined in: [gen/types.gen.ts:4257](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4257)

The key of the root process instance. The root process instance is the top-level
ancestor in the process instance hierarchy. This field is only present for data
belonging to process instance hierarchies created in version 8.9 or later.

***

### state

```ts
state: JobStateEnum;
```

Defined in: [gen/types.gen.ts:4262](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4262)

***

### tenantId

```ts
tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:4263](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4263)

***

### type

```ts
type: string;
```

Defined in: [gen/types.gen.ts:4267](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4267)

The type of the job.

***

### worker

```ts
worker: string;
```

Defined in: [gen/types.gen.ts:4271](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4271)

The name of the worker of this job.
