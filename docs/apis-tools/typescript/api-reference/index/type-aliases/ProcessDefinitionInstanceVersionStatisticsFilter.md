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

Defined in: [gen/types.gen.ts:5920](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5920)

Process definition instance version statistics search filter.

## Properties

### processDefinitionId

```ts
processDefinitionId: ProcessDefinitionId;
```

Defined in: [gen/types.gen.ts:5924](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5924)

The ID of the process definition to retrieve version statistics for.

***

### tenantId?

```ts
optional tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:5928](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5928)

Tenant ID of this process definition.
