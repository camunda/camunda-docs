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

Defined in: [gen/types.gen.ts:4087](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4087)

Job search filter.

## Properties

### creationTime?

```ts
optional creationTime: DateTimeFilterProperty;
```

Defined in: [gen/types.gen.ts:4171](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4171)

When the job was created. Field is present for jobs created after 8.9.

***

### deadline?

```ts
optional deadline: DateTimeFilterProperty | null;
```

Defined in: [gen/types.gen.ts:4091](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4091)

When the job can next be activated.

***

### deniedReason?

```ts
optional deniedReason: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:4095](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4095)

The reason provided by the user task listener for denying the work.

***

### elementId?

```ts
optional elementId: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:4099](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4099)

The element ID associated with the job.

***

### elementInstanceKey?

```ts
optional elementInstanceKey: ElementInstanceKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:4103](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4103)

The element instance key associated with the job.

***

### endTime?

```ts
optional endTime: DateTimeFilterProperty;
```

Defined in: [gen/types.gen.ts:4107](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4107)

When the job ended.

***

### errorCode?

```ts
optional errorCode: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:4111](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4111)

The error code provided for the failed job.

***

### errorMessage?

```ts
optional errorMessage: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:4115](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4115)

The error message that provides additional context for a failed job.

***

### hasFailedWithRetriesLeft?

```ts
optional hasFailedWithRetriesLeft: boolean;
```

Defined in: [gen/types.gen.ts:4119](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4119)

Indicates whether the job has failed with retries left.

***

### isDenied?

```ts
optional isDenied: boolean | null;
```

Defined in: [gen/types.gen.ts:4123](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4123)

Indicates whether the user task listener denies the work.

***

### jobKey?

```ts
optional jobKey: JobKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:4127](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4127)

The key, a unique identifier for the job.

***

### kind?

```ts
optional kind: JobKindFilterProperty;
```

Defined in: [gen/types.gen.ts:4131](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4131)

The kind of the job.

***

### lastUpdateTime?

```ts
optional lastUpdateTime: DateTimeFilterProperty;
```

Defined in: [gen/types.gen.ts:4175](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4175)

When the job was last updated. Field is present for jobs created after 8.9.

***

### listenerEventType?

```ts
optional listenerEventType: JobListenerEventTypeFilterProperty;
```

Defined in: [gen/types.gen.ts:4135](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4135)

The listener event type of the job.

***

### processDefinitionId?

```ts
optional processDefinitionId: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:4139](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4139)

The process definition ID associated with the job.

***

### processDefinitionKey?

```ts
optional processDefinitionKey: ProcessDefinitionKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:4143](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4143)

The process definition key associated with the job.

***

### processInstanceKey?

```ts
optional processInstanceKey: ProcessInstanceKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:4147](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4147)

The process instance key associated with the job.

***

### retries?

```ts
optional retries: IntegerFilterProperty;
```

Defined in: [gen/types.gen.ts:4151](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4151)

The number of retries left.

***

### state?

```ts
optional state: JobStateFilterProperty;
```

Defined in: [gen/types.gen.ts:4155](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4155)

The state of the job.

***

### tenantId?

```ts
optional tenantId: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:4159](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4159)

The tenant ID.

***

### type?

```ts
optional type: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:4163](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4163)

The type of the job.

***

### worker?

```ts
optional worker: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:4167](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4167)

The name of the worker for this job.
