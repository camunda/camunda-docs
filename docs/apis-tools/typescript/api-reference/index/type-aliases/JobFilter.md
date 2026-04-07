---
title: "Type Alias: JobFilter"
sidebar_label: "JobFilter"
mdx:
  format: md
---

# Type Alias: JobFilter

```ts
type JobFilter = object;
```

Defined in: [gen/types.gen.ts:4158](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4158)

Job search filter.

## Properties

### creationTime?

```ts
optional creationTime?: DateTimeFilterProperty;
```

Defined in: [gen/types.gen.ts:4242](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4242)

When the job was created. Field is present for jobs created after 8.9.

---

### deadline?

```ts
optional deadline?: DateTimeFilterProperty | null;
```

Defined in: [gen/types.gen.ts:4162](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4162)

When the job can next be activated.

---

### deniedReason?

```ts
optional deniedReason?: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:4166](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4166)

The reason provided by the user task listener for denying the work.

---

### elementId?

```ts
optional elementId?: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:4170](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4170)

The element ID associated with the job.

---

### elementInstanceKey?

```ts
optional elementInstanceKey?: ElementInstanceKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:4174](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4174)

The element instance key associated with the job.

---

### endTime?

```ts
optional endTime?: DateTimeFilterProperty;
```

Defined in: [gen/types.gen.ts:4178](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4178)

When the job ended.

---

### errorCode?

```ts
optional errorCode?: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:4182](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4182)

The error code provided for the failed job.

---

### errorMessage?

```ts
optional errorMessage?: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:4186](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4186)

The error message that provides additional context for a failed job.

---

### hasFailedWithRetriesLeft?

```ts
optional hasFailedWithRetriesLeft?: boolean;
```

Defined in: [gen/types.gen.ts:4190](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4190)

Indicates whether the job has failed with retries left.

---

### isDenied?

```ts
optional isDenied?: boolean | null;
```

Defined in: [gen/types.gen.ts:4194](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4194)

Indicates whether the user task listener denies the work.

---

### jobKey?

```ts
optional jobKey?: JobKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:4198](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4198)

The key, a unique identifier for the job.

---

### kind?

```ts
optional kind?: JobKindFilterProperty;
```

Defined in: [gen/types.gen.ts:4202](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4202)

The kind of the job.

---

### lastUpdateTime?

```ts
optional lastUpdateTime?: DateTimeFilterProperty;
```

Defined in: [gen/types.gen.ts:4246](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4246)

When the job was last updated. Field is present for jobs created after 8.9.

---

### listenerEventType?

```ts
optional listenerEventType?: JobListenerEventTypeFilterProperty;
```

Defined in: [gen/types.gen.ts:4206](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4206)

The listener event type of the job.

---

### processDefinitionId?

```ts
optional processDefinitionId?: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:4210](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4210)

The process definition ID associated with the job.

---

### processDefinitionKey?

```ts
optional processDefinitionKey?: ProcessDefinitionKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:4214](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4214)

The process definition key associated with the job.

---

### processInstanceKey?

```ts
optional processInstanceKey?: ProcessInstanceKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:4218](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4218)

The process instance key associated with the job.

---

### retries?

```ts
optional retries?: IntegerFilterProperty;
```

Defined in: [gen/types.gen.ts:4222](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4222)

The number of retries left.

---

### state?

```ts
optional state?: JobStateFilterProperty;
```

Defined in: [gen/types.gen.ts:4226](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4226)

The state of the job.

---

### tenantId?

```ts
optional tenantId?: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:4230](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4230)

The tenant ID.

---

### type?

```ts
optional type?: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:4234](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4234)

The type of the job.

---

### worker?

```ts
optional worker?: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:4238](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4238)

The name of the worker for this job.
