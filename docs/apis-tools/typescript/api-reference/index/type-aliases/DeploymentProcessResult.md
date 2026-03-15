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

Defined in: [gen/types.gen.ts:2099](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L2099)

A deployed process.

## Properties

### processDefinitionId

```ts
processDefinitionId: ProcessDefinitionId;
```

Defined in: [gen/types.gen.ts:2105](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L2105)

The bpmn process ID, as parsed during deployment, together with the version forms a
unique identifier for a specific process definition.

***

### processDefinitionKey

```ts
processDefinitionKey: ProcessDefinitionKey;
```

Defined in: [gen/types.gen.ts:2121](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L2121)

The assigned key, which acts as a unique identifier for this process.

***

### processDefinitionVersion

```ts
processDefinitionVersion: number;
```

Defined in: [gen/types.gen.ts:2109](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L2109)

The assigned process version.

***

### resourceName

```ts
resourceName: string;
```

Defined in: [gen/types.gen.ts:2113](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L2113)

The resource name from which this process was parsed.

***

### tenantId

```ts
tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:2117](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L2117)

The tenant ID of the deployed process.
