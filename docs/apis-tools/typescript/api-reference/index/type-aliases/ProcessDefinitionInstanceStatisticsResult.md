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

Defined in: [gen/types.gen.ts:5873](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5873)

Process definition instance statistics response.

## Properties

### activeInstancesWithIncidentCount?

```ts
optional activeInstancesWithIncidentCount: number;
```

Defined in: [gen/types.gen.ts:5891](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5891)

Total number of currently active process instances of this definition that have at least one incident.

***

### activeInstancesWithoutIncidentCount?

```ts
optional activeInstancesWithoutIncidentCount: number;
```

Defined in: [gen/types.gen.ts:5887](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5887)

Total number of currently active process instances of this definition that do not have incidents.

***

### hasMultipleVersions?

```ts
optional hasMultipleVersions: boolean;
```

Defined in: [gen/types.gen.ts:5883](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5883)

Indicates whether multiple versions of this process definition instance are deployed.

***

### latestProcessDefinitionName?

```ts
optional latestProcessDefinitionName: string | null;
```

Defined in: [gen/types.gen.ts:5879](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5879)

Name of the latest deployed process definition instance version.

***

### processDefinitionId?

```ts
optional processDefinitionId: ProcessDefinitionId;
```

Defined in: [gen/types.gen.ts:5874](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5874)

***

### tenantId?

```ts
optional tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:5875](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5875)
