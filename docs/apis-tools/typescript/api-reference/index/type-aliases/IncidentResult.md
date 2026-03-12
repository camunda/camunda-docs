---
title: "Type Alias: IncidentResult"
sidebar_label: "IncidentResult"
mdx:
  format: md
---

# Type Alias: IncidentResult

```ts
type IncidentResult = object;
```

Defined in: [gen/types.gen.ts:3516](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L3516)

## Properties

### creationTime

```ts
creationTime: string;
```

Defined in: [gen/types.gen.ts:3536](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L3536)

The creation time of the incident.

***

### elementId

```ts
elementId: ElementId;
```

Defined in: [gen/types.gen.ts:3532](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L3532)

The element ID associated to this incident.

***

### elementInstanceKey

```ts
elementInstanceKey: ElementInstanceKey;
```

Defined in: [gen/types.gen.ts:3567](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L3567)

The element instance key associated to this incident.

***

### errorMessage

```ts
errorMessage: string;
```

Defined in: [gen/types.gen.ts:3528](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L3528)

Error message which describes the error in more detail.

***

### errorType

```ts
errorType: IncidentErrorTypeEnum;
```

Defined in: [gen/types.gen.ts:3524](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L3524)

The type of the incident error.

***

### incidentKey

```ts
incidentKey: IncidentKey;
```

Defined in: [gen/types.gen.ts:3548](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L3548)

The assigned key, which acts as a unique identifier for this incident.

***

### jobKey

```ts
jobKey: JobKey | null;
```

Defined in: [gen/types.gen.ts:3571](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L3571)

The job key, if exists, associated with this incident.

***

### processDefinitionId

```ts
processDefinitionId: ProcessDefinitionId;
```

Defined in: [gen/types.gen.ts:3520](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L3520)

The process definition ID associated to this incident.

***

### processDefinitionKey

```ts
processDefinitionKey: ProcessDefinitionKey;
```

Defined in: [gen/types.gen.ts:3552](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L3552)

The process definition key associated to this incident.

***

### processInstanceKey

```ts
processInstanceKey: ProcessInstanceKey;
```

Defined in: [gen/types.gen.ts:3556](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L3556)

The process instance key associated to this incident.

***

### rootProcessInstanceKey

```ts
rootProcessInstanceKey: ProcessInstanceKey | null;
```

Defined in: [gen/types.gen.ts:3563](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L3563)

The key of the root process instance. The root process instance is the top-level
ancestor in the process instance hierarchy. This field is only present for data
belonging to process instance hierarchies created in version 8.9 or later.

***

### state

```ts
state: IncidentStateEnum;
```

Defined in: [gen/types.gen.ts:3540](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L3540)

The incident state.

***

### tenantId

```ts
tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:3544](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L3544)

The tenant ID of the incident.
