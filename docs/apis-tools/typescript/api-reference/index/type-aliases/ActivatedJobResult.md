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

Defined in: [gen/types.gen.ts:4008](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4008)

## Properties

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

---

### deadline

```ts
deadline: number;
```

Defined in: [gen/types.gen.ts:4042](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4042)

When the job can be activated again, sent as a UNIX epoch timestamp.

---

### elementId

```ts
elementId: ElementId;
```

Defined in: [gen/types.gen.ts:4024](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4024)

The associated task element ID.

---

### elementInstanceKey

```ts
elementInstanceKey: ElementInstanceKey;
```

Defined in: [gen/types.gen.ts:4068](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4068)

The element instance key of the task.

---

### jobKey

```ts
jobKey: JobKey;
```

Defined in: [gen/types.gen.ts:4056](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4056)

The key, a unique identifier for the job.

---

### kind

```ts
kind: JobKindEnum;
```

Defined in: [gen/types.gen.ts:4069](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4069)

---

### listenerEventType

```ts
listenerEventType: JobListenerEventTypeEnum;
```

Defined in: [gen/types.gen.ts:4070](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4070)

---

### processDefinitionId

```ts
processDefinitionId: ProcessDefinitionId;
```

Defined in: [gen/types.gen.ts:4016](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4016)

The bpmn process ID of the job's process definition.

---

### processDefinitionKey

```ts
processDefinitionKey: ProcessDefinitionKey;
```

Defined in: [gen/types.gen.ts:4064](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4064)

The key of the job's process definition.

---

### processDefinitionVersion

```ts
processDefinitionVersion: number;
```

Defined in: [gen/types.gen.ts:4020](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4020)

The version of the job's process definition.

---

### processInstanceKey

```ts
processInstanceKey: ProcessInstanceKey;
```

Defined in: [gen/types.gen.ts:4060](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4060)

The job's process instance key.

---

### retries

```ts
retries: number;
```

Defined in: [gen/types.gen.ts:4038](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4038)

The amount of retries left to this job (should always be positive).

---

### rootProcessInstanceKey

```ts
rootProcessInstanceKey: ProcessInstanceKey | null;
```

Defined in: [gen/types.gen.ts:4084](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4084)

The key of the root process instance. The root process instance is the top-level
ancestor in the process instance hierarchy. This field is only present for data
belonging to process instance hierarchies created in version 8.9 or later.

---

### tags

```ts
tags: TagSet;
```

Defined in: [gen/types.gen.ts:4077](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4077)

---

### tenantId

```ts
tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:4052](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4052)

The ID of the tenant that owns the job.

---

### type

```ts
type: string;
```

Defined in: [gen/types.gen.ts:4012](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4012)

The type of the job (should match what was requested).

---

### userTask

```ts
userTask: UserTaskProperties | null;
```

Defined in: [gen/types.gen.ts:4076](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4076)

User task properties, if the job is a user task.
This is `null` if the job is not a user task.

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

---

### worker

```ts
worker: string;
```

Defined in: [gen/types.gen.ts:4034](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4034)

The name of the worker which activated this job.
