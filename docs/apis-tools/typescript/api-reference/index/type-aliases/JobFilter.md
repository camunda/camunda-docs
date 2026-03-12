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

Defined in: [gen/types.gen.ts:4155](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4155)

Job search filter.

## Properties

### creationTime?

```ts
optional creationTime: DateTimeFilterProperty;
```

Defined in: [gen/types.gen.ts:4239](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4239)

When the job was created. Field is present for jobs created after 8.9.

***

### deadline?

```ts
optional deadline: DateTimeFilterProperty | null;
```

Defined in: [gen/types.gen.ts:4159](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4159)

When the job can next be activated.

***

### deniedReason?

```ts
optional deniedReason: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:4163](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4163)

The reason provided by the user task listener for denying the work.

***

### elementId?

```ts
optional elementId: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:4167](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4167)

The element ID associated with the job.

***

### elementInstanceKey?

```ts
optional elementInstanceKey: ElementInstanceKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:4171](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4171)

The element instance key associated with the job.

***

### endTime?

```ts
optional endTime: DateTimeFilterProperty;
```

Defined in: [gen/types.gen.ts:4175](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4175)

When the job ended.

***

### errorCode?

```ts
optional errorCode: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:4179](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4179)

The error code provided for the failed job.

***

### errorMessage?

```ts
optional errorMessage: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:4183](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4183)

The error message that provides additional context for a failed job.

***

### hasFailedWithRetriesLeft?

```ts
optional hasFailedWithRetriesLeft: boolean;
```

Defined in: [gen/types.gen.ts:4187](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4187)

Indicates whether the job has failed with retries left.

***

### isDenied?

```ts
optional isDenied: boolean | null;
```

Defined in: [gen/types.gen.ts:4191](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4191)

Indicates whether the user task listener denies the work.

***

### jobKey?

```ts
optional jobKey: JobKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:4195](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4195)

The key, a unique identifier for the job.

***

### kind?

```ts
optional kind: JobKindFilterProperty;
```

Defined in: [gen/types.gen.ts:4199](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4199)

The kind of the job.

***

### lastUpdateTime?

```ts
optional lastUpdateTime: DateTimeFilterProperty;
```

Defined in: [gen/types.gen.ts:4243](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4243)

When the job was last updated. Field is present for jobs created after 8.9.

***

### listenerEventType?

```ts
optional listenerEventType: JobListenerEventTypeFilterProperty;
```

Defined in: [gen/types.gen.ts:4203](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4203)

The listener event type of the job.

***

### processDefinitionId?

```ts
optional processDefinitionId: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:4207](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4207)

The process definition ID associated with the job.

***

### processDefinitionKey?

```ts
optional processDefinitionKey: ProcessDefinitionKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:4211](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4211)

The process definition key associated with the job.

***

### processInstanceKey?

```ts
optional processInstanceKey: ProcessInstanceKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:4215](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4215)

The process instance key associated with the job.

***

### retries?

```ts
optional retries: IntegerFilterProperty;
```

Defined in: [gen/types.gen.ts:4219](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4219)

The number of retries left.

***

### state?

```ts
optional state: JobStateFilterProperty;
```

Defined in: [gen/types.gen.ts:4223](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4223)

The state of the job.

***

### tenantId?

```ts
optional tenantId: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:4227](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4227)

The tenant ID.

***

### type?

```ts
optional type: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:4231](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4231)

The type of the job.

***

### worker?

```ts
optional worker: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:4235](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L4235)

The name of the worker for this job.
