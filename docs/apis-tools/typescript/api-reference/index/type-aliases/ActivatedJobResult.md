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

Defined in: [gen/types.gen.ts:3937](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L3937)

## Properties

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

***

### deadline

```ts
deadline: number;
```

Defined in: [gen/types.gen.ts:3971](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L3971)

When the job can be activated again, sent as a UNIX epoch timestamp.

***

### elementId

```ts
elementId: ElementId;
```

Defined in: [gen/types.gen.ts:3953](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L3953)

The associated task element ID.

***

### elementInstanceKey

```ts
elementInstanceKey: ElementInstanceKey;
```

Defined in: [gen/types.gen.ts:3997](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L3997)

The element instance key of the task.

***

### jobKey

```ts
jobKey: JobKey;
```

Defined in: [gen/types.gen.ts:3985](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L3985)

The key, a unique identifier for the job.

***

### kind

```ts
kind: JobKindEnum;
```

Defined in: [gen/types.gen.ts:3998](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L3998)

***

### listenerEventType

```ts
listenerEventType: JobListenerEventTypeEnum;
```

Defined in: [gen/types.gen.ts:3999](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L3999)

***

### processDefinitionId

```ts
processDefinitionId: ProcessDefinitionId;
```

Defined in: [gen/types.gen.ts:3945](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L3945)

The bpmn process ID of the job's process definition.

***

### processDefinitionKey

```ts
processDefinitionKey: ProcessDefinitionKey;
```

Defined in: [gen/types.gen.ts:3993](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L3993)

The key of the job's process definition.

***

### processDefinitionVersion

```ts
processDefinitionVersion: number;
```

Defined in: [gen/types.gen.ts:3949](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L3949)

The version of the job's process definition.

***

### processInstanceKey

```ts
processInstanceKey: ProcessInstanceKey;
```

Defined in: [gen/types.gen.ts:3989](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L3989)

The job's process instance key.

***

### retries

```ts
retries: number;
```

Defined in: [gen/types.gen.ts:3967](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L3967)

The amount of retries left to this job (should always be positive).

***

### rootProcessInstanceKey

```ts
rootProcessInstanceKey: ProcessInstanceKey | null;
```

Defined in: [gen/types.gen.ts:4013](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4013)

The key of the root process instance. The root process instance is the top-level
ancestor in the process instance hierarchy. This field is only present for data
belonging to process instance hierarchies created in version 8.9 or later.

***

### tags

```ts
tags: TagSet;
```

Defined in: [gen/types.gen.ts:4006](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4006)

***

### tenantId

```ts
tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:3981](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L3981)

The ID of the tenant that owns the job.

***

### type

```ts
type: string;
```

Defined in: [gen/types.gen.ts:3941](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L3941)

The type of the job (should match what was requested).

***

### userTask?

```ts
optional userTask: UserTaskProperties | null;
```

Defined in: [gen/types.gen.ts:4005](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4005)

User task properties, if the job is a user task.
This is `null` if the job is not a user task.

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

***

### worker

```ts
worker: string;
```

Defined in: [gen/types.gen.ts:3963](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L3963)

The name of the worker which activated this job.
