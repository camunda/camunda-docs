---
title: "Type Alias: CreateProcessInstanceResult"
sidebar_label: "CreateProcessInstanceResult"
mdx:
  format: md
---

# Type Alias: CreateProcessInstanceResult

```ts
type CreateProcessInstanceResult = object;
```

Defined in: [gen/types.gen.ts:6232](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L6232)

## Properties

### businessId

```ts
businessId: BusinessId | null;
```

Defined in: [gen/types.gen.ts:6269](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L6269)

Business id as provided on creation.

***

### processDefinitionId

```ts
processDefinitionId: ProcessDefinitionId;
```

Defined in: [gen/types.gen.ts:6238](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L6238)

The BPMN process id of the process definition which was used to create the process.
instance

***

### processDefinitionKey

```ts
processDefinitionKey: ProcessDefinitionKey;
```

Defined in: [gen/types.gen.ts:6258](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L6258)

The key of the process definition which was used to create the process instance.

***

### processDefinitionVersion

```ts
processDefinitionVersion: number;
```

Defined in: [gen/types.gen.ts:6243](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L6243)

The version of the process definition which was used to create the process instance.

***

### processInstanceKey

```ts
processInstanceKey: ProcessInstanceKey;
```

Defined in: [gen/types.gen.ts:6264](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L6264)

The unique identifier of the created process instance; to be used wherever a request
needs a process instance key (e.g. CancelProcessInstanceRequest).

***

### tags

```ts
tags: TagSet;
```

Defined in: [gen/types.gen.ts:6265](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L6265)

***

### tenantId

```ts
tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:6247](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L6247)

The tenant id of the created process instance.

***

### variables

```ts
variables: object;
```

Defined in: [gen/types.gen.ts:6251](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L6251)

All the variables visible in the root scope.

#### Index Signature

```ts
[key: string]: unknown
```
