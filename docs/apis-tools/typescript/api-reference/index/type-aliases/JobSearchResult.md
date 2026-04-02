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

Defined in: [gen/types.gen.ts:4259](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4259)

## Properties

### creationTime

```ts
creationTime: string | null;
```

Defined in: [gen/types.gen.ts:4346](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4346)

When the job was created. Field is present for jobs created after 8.9.

---

### customHeaders

```ts
customHeaders: object;
```

Defined in: [gen/types.gen.ts:4263](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4263)

A set of custom headers defined during modelling.

#### Index Signature

```ts
[key: string]: string
```

---

### deadline

```ts
deadline: string | null;
```

Defined in: [gen/types.gen.ts:4269](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4269)

If the job has been activated, when it will next be available to be activated.

---

### deniedReason

```ts
deniedReason: string | null;
```

Defined in: [gen/types.gen.ts:4273](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4273)

The reason provided by the user task listener for denying the work.

---

### elementId

```ts
elementId: ElementId | null;
```

Defined in: [gen/types.gen.ts:4277](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4277)

The element ID associated with the job. May be missing on job failure.

---

### elementInstanceKey

```ts
elementInstanceKey: ElementInstanceKey;
```

Defined in: [gen/types.gen.ts:4281](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4281)

The element instance key associated with the job.

---

### endTime

```ts
endTime: string | null;
```

Defined in: [gen/types.gen.ts:4287](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4287)

End date of the job.
This is `null` if the job is not in an end state yet.

---

### errorCode

```ts
errorCode: string | null;
```

Defined in: [gen/types.gen.ts:4291](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4291)

The error code provided for a failed job.

---

### errorMessage

```ts
errorMessage: string | null;
```

Defined in: [gen/types.gen.ts:4295](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4295)

The error message that provides additional context for a failed job.

---

### hasFailedWithRetriesLeft

```ts
hasFailedWithRetriesLeft: boolean;
```

Defined in: [gen/types.gen.ts:4299](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4299)

Indicates whether the job has failed with retries left.

---

### isDenied

```ts
isDenied: boolean | null;
```

Defined in: [gen/types.gen.ts:4303](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4303)

Indicates whether the user task listener denies the work.

---

### jobKey

```ts
jobKey: JobKey;
```

Defined in: [gen/types.gen.ts:4307](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4307)

The key, a unique identifier for the job.

---

### kind

```ts
kind: JobKindEnum;
```

Defined in: [gen/types.gen.ts:4308](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4308)

---

### lastUpdateTime

```ts
lastUpdateTime: string | null;
```

Defined in: [gen/types.gen.ts:4350](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4350)

When the job was last updated. Field is present for jobs created after 8.9.

---

### listenerEventType

```ts
listenerEventType: JobListenerEventTypeEnum;
```

Defined in: [gen/types.gen.ts:4309](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4309)

---

### processDefinitionId

```ts
processDefinitionId: ProcessDefinitionId;
```

Defined in: [gen/types.gen.ts:4313](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4313)

The process definition ID associated with the job.

---

### processDefinitionKey

```ts
processDefinitionKey: ProcessDefinitionKey;
```

Defined in: [gen/types.gen.ts:4317](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4317)

The process definition key associated with the job.

---

### processInstanceKey

```ts
processInstanceKey: ProcessInstanceKey;
```

Defined in: [gen/types.gen.ts:4321](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4321)

The process instance key associated with the job.

---

### retries

```ts
retries: number;
```

Defined in: [gen/types.gen.ts:4332](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4332)

The amount of retries left to this job.

---

### rootProcessInstanceKey

```ts
rootProcessInstanceKey: ProcessInstanceKey | null;
```

Defined in: [gen/types.gen.ts:4328](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4328)

The key of the root process instance. The root process instance is the top-level
ancestor in the process instance hierarchy. This field is only present for data
belonging to process instance hierarchies created in version 8.9 or later.

---

### state

```ts
state: JobStateEnum;
```

Defined in: [gen/types.gen.ts:4333](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4333)

---

### tenantId

```ts
tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:4334](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4334)

---

### type

```ts
type: string;
```

Defined in: [gen/types.gen.ts:4338](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4338)

The type of the job.

---

### worker

```ts
worker: string;
```

Defined in: [gen/types.gen.ts:4342](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4342)

The name of the worker of this job.
