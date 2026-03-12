---
title: "Type Alias: ProcessInstanceResult"
sidebar_label: "ProcessInstanceResult"
mdx:
  format: md
---

# Type Alias: ProcessInstanceResult

```ts
type ProcessInstanceResult = object;
```

Defined in: [gen/types.gen.ts:6488](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L6488)

Process instance search response item.

## Properties

### businessId

```ts
businessId: BusinessId | null;
```

Defined in: [gen/types.gen.ts:6543](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L6543)

The business id associated with this process instance.

***

### endDate

```ts
endDate: string | null;
```

Defined in: [gen/types.gen.ts:6509](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L6509)

The completion or termination time of the process instance.

***

### hasIncident

```ts
hasIncident: boolean;
```

Defined in: [gen/types.gen.ts:6514](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L6514)

Whether this process instance has a related incident or not.

***

### parentElementInstanceKey

```ts
parentElementInstanceKey: ElementInstanceKey | null;
```

Defined in: [gen/types.gen.ts:6531](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L6531)

The parent element instance key.

***

### parentProcessInstanceKey

```ts
parentProcessInstanceKey: ProcessInstanceKey | null;
```

Defined in: [gen/types.gen.ts:6527](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L6527)

The parent process instance key.

***

### processDefinitionId

```ts
processDefinitionId: ProcessDefinitionId;
```

Defined in: [gen/types.gen.ts:6489](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L6489)

***

### processDefinitionKey

```ts
processDefinitionKey: ProcessDefinitionKey;
```

Defined in: [gen/types.gen.ts:6523](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L6523)

The process definition key.

***

### processDefinitionName

```ts
processDefinitionName: string | null;
```

Defined in: [gen/types.gen.ts:6493](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L6493)

The process definition name.

***

### processDefinitionVersion

```ts
processDefinitionVersion: number;
```

Defined in: [gen/types.gen.ts:6497](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L6497)

The process definition version.

***

### processDefinitionVersionTag

```ts
processDefinitionVersionTag: string | null;
```

Defined in: [gen/types.gen.ts:6501](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L6501)

The process definition version tag.

***

### processInstanceKey

```ts
processInstanceKey: ProcessInstanceKey;
```

Defined in: [gen/types.gen.ts:6519](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L6519)

The key of this process instance.

***

### rootProcessInstanceKey

```ts
rootProcessInstanceKey: ProcessInstanceKey | null;
```

Defined in: [gen/types.gen.ts:6538](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L6538)

The key of the root process instance. The root process instance is the top-level
ancestor in the process instance hierarchy. This field is only present for data
belonging to process instance hierarchies created in version 8.9 or later.

***

### startDate

```ts
startDate: string;
```

Defined in: [gen/types.gen.ts:6505](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L6505)

The start time of the process instance.

***

### state

```ts
state: ProcessInstanceStateEnum;
```

Defined in: [gen/types.gen.ts:6510](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L6510)

***

### tags

```ts
tags: TagSet;
```

Defined in: [gen/types.gen.ts:6539](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L6539)

***

### tenantId

```ts
tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:6515](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L6515)
