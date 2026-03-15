---
title: "Type Alias: ProcessDefinitionInstanceVersionStatisticsResult"
sidebar_label: "ProcessDefinitionInstanceVersionStatisticsResult"
mdx:
  format: md
---

# Type Alias: ProcessDefinitionInstanceVersionStatisticsResult

```ts
type ProcessDefinitionInstanceVersionStatisticsResult = object;
```

Defined in: [gen/types.gen.ts:6012](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L6012)

Process definition instance version statistics response.

## Properties

### activeInstancesWithIncidentCount

```ts
activeInstancesWithIncidentCount: number;
```

Defined in: [gen/types.gen.ts:6036](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L6036)

The number of active process instances for this version that currently have incidents.

***

### activeInstancesWithoutIncidentCount

```ts
activeInstancesWithoutIncidentCount: number;
```

Defined in: [gen/types.gen.ts:6040](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L6040)

The number of active process instances for this version that do not have any incidents.

***

### processDefinitionId

```ts
processDefinitionId: ProcessDefinitionId;
```

Defined in: [gen/types.gen.ts:6016](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L6016)

The ID associated with the process definition.

***

### processDefinitionKey

```ts
processDefinitionKey: ProcessDefinitionKey;
```

Defined in: [gen/types.gen.ts:6020](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L6020)

The unique key of the process definition.

***

### processDefinitionName

```ts
processDefinitionName: string | null;
```

Defined in: [gen/types.gen.ts:6024](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L6024)

The name of the process definition.

***

### processDefinitionVersion

```ts
processDefinitionVersion: number;
```

Defined in: [gen/types.gen.ts:6032](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L6032)

The version number of the process definition.

***

### tenantId

```ts
tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:6028](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L6028)

The tenant ID associated with the process definition.
