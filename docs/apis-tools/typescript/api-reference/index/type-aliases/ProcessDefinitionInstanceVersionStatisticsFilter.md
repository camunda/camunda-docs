---
title: "Type Alias: ProcessDefinitionInstanceVersionStatisticsFilter"
sidebar_label: "ProcessDefinitionInstanceVersionStatisticsFilter"
mdx:
  format: md
---

# Type Alias: ProcessDefinitionInstanceVersionStatisticsFilter

```ts
type ProcessDefinitionInstanceVersionStatisticsFilter = object;
```

Defined in: [gen/types.gen.ts:5991](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5991)

Process definition instance version statistics search filter.

## Properties

### processDefinitionId

```ts
processDefinitionId: ProcessDefinitionId;
```

Defined in: [gen/types.gen.ts:5995](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5995)

The ID of the process definition to retrieve version statistics for.

***

### tenantId?

```ts
optional tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:5999](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5999)

Tenant ID of this process definition.
