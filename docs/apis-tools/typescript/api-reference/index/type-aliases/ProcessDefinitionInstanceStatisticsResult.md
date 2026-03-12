---
title: "Type Alias: ProcessDefinitionInstanceStatisticsResult"
sidebar_label: "ProcessDefinitionInstanceStatisticsResult"
mdx:
  format: md
---

# Type Alias: ProcessDefinitionInstanceStatisticsResult

```ts
type ProcessDefinitionInstanceStatisticsResult = object;
```

Defined in: [gen/types.gen.ts:5944](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5944)

Process definition instance statistics response.

## Properties

### activeInstancesWithIncidentCount

```ts
activeInstancesWithIncidentCount: number;
```

Defined in: [gen/types.gen.ts:5962](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5962)

Total number of currently active process instances of this definition that have at least one incident.

***

### activeInstancesWithoutIncidentCount

```ts
activeInstancesWithoutIncidentCount: number;
```

Defined in: [gen/types.gen.ts:5958](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5958)

Total number of currently active process instances of this definition that do not have incidents.

***

### hasMultipleVersions

```ts
hasMultipleVersions: boolean;
```

Defined in: [gen/types.gen.ts:5954](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5954)

Indicates whether multiple versions of this process definition instance are deployed.

***

### latestProcessDefinitionName

```ts
latestProcessDefinitionName: string | null;
```

Defined in: [gen/types.gen.ts:5950](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5950)

Name of the latest deployed process definition instance version.

***

### processDefinitionId

```ts
processDefinitionId: ProcessDefinitionId;
```

Defined in: [gen/types.gen.ts:5945](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5945)

***

### tenantId

```ts
tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:5946](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5946)
