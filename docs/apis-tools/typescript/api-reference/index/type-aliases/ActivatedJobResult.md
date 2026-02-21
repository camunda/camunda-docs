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

Defined in: [gen/types.gen.ts:3386](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3386)

## Properties

### customHeaders

```ts
customHeaders: object;
```

Defined in: [gen/types.gen.ts:3406](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3406)

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

Defined in: [gen/types.gen.ts:3420](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3420)

When the job can be activated again, sent as a UNIX epoch timestamp.

---

### elementId

```ts
elementId: ElementId;
```

Defined in: [gen/types.gen.ts:3402](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3402)

The associated task element ID.

---

### elementInstanceKey

```ts
elementInstanceKey: ElementInstanceKey;
```

Defined in: [gen/types.gen.ts:3443](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3443)

---

### jobKey

```ts
jobKey: JobKey;
```

Defined in: [gen/types.gen.ts:3434](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3434)

The key, a unique identifier for the job.

---

### kind

```ts
kind: JobKindEnum;
```

Defined in: [gen/types.gen.ts:3444](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3444)

---

### listenerEventType

```ts
listenerEventType: JobListenerEventTypeEnum;
```

Defined in: [gen/types.gen.ts:3445](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3445)

---

### processDefinitionId

```ts
processDefinitionId: ProcessDefinitionId;
```

Defined in: [gen/types.gen.ts:3394](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3394)

The bpmn process ID of the job's process definition.

---

### processDefinitionKey

```ts
processDefinitionKey: ProcessDefinitionKey;
```

Defined in: [gen/types.gen.ts:3442](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3442)

The key of the job's process definition.

---

### processDefinitionVersion

```ts
processDefinitionVersion: number;
```

Defined in: [gen/types.gen.ts:3398](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3398)

The version of the job's process definition.

---

### processInstanceKey

```ts
processInstanceKey: ProcessInstanceKey;
```

Defined in: [gen/types.gen.ts:3438](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3438)

The job's process instance key.

---

### retries

```ts
retries: number;
```

Defined in: [gen/types.gen.ts:3416](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3416)

The amount of retries left to this job (should always be positive).

---

### tags?

```ts
optional tags: TagSet;
```

Defined in: [gen/types.gen.ts:3447](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3447)

---

### tenantId

```ts
tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:3430](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3430)

The ID of the tenant that owns the job.

---

### type

```ts
type: string;
```

Defined in: [gen/types.gen.ts:3390](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3390)

The type of the job (should match what was requested).

---

### userTask?

```ts
optional userTask: UserTaskProperties;
```

Defined in: [gen/types.gen.ts:3446](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3446)

---

### variables

```ts
variables: object;
```

Defined in: [gen/types.gen.ts:3424](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3424)

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

Defined in: [gen/types.gen.ts:3412](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3412)

The name of the worker which activated this job.
