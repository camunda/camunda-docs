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

Defined in: [gen/types.gen.ts:5941](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5941)

Process definition instance version statistics response.

## Properties

### activeInstancesWithIncidentCount

```ts
activeInstancesWithIncidentCount: number;
```

Defined in: [gen/types.gen.ts:5965](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5965)

The number of active process instances for this version that currently have incidents.

***

### activeInstancesWithoutIncidentCount

```ts
activeInstancesWithoutIncidentCount: number;
```

Defined in: [gen/types.gen.ts:5969](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5969)

The number of active process instances for this version that do not have any incidents.

***

### processDefinitionId

```ts
processDefinitionId: ProcessDefinitionId;
```

Defined in: [gen/types.gen.ts:5945](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5945)

The ID associated with the process definition.

***

### processDefinitionKey

```ts
processDefinitionKey: ProcessDefinitionKey;
```

Defined in: [gen/types.gen.ts:5949](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5949)

The unique key of the process definition.

***

### processDefinitionName

```ts
processDefinitionName: string | null;
```

Defined in: [gen/types.gen.ts:5953](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5953)

The name of the process definition.

***

### processDefinitionVersion

```ts
processDefinitionVersion: number;
```

Defined in: [gen/types.gen.ts:5961](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5961)

The version number of the process definition.

***

### tenantId

```ts
tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:5957](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5957)

The tenant ID associated with the process definition.
