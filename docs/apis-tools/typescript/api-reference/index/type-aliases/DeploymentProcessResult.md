---
title: "Type Alias: DeploymentProcessResult"
sidebar_label: "DeploymentProcessResult"
mdx:
  format: md
---

# Type Alias: DeploymentProcessResult

```ts
type DeploymentProcessResult = object;
```

Defined in: [gen/types.gen.ts:2097](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2097)

A deployed process.

## Properties

### processDefinitionId

```ts
processDefinitionId: ProcessDefinitionId;
```

Defined in: [gen/types.gen.ts:2103](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2103)

The bpmn process ID, as parsed during deployment, together with the version forms a
unique identifier for a specific process definition.

***

### processDefinitionKey

```ts
processDefinitionKey: ProcessDefinitionKey;
```

Defined in: [gen/types.gen.ts:2119](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2119)

The assigned key, which acts as a unique identifier for this process.

***

### processDefinitionVersion

```ts
processDefinitionVersion: number;
```

Defined in: [gen/types.gen.ts:2107](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2107)

The assigned process version.

***

### resourceName

```ts
resourceName: string;
```

Defined in: [gen/types.gen.ts:2111](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2111)

The resource name from which this process was parsed.

***

### tenantId

```ts
tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:2115](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2115)

The tenant ID of the deployed process.
