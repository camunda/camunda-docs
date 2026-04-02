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

Defined in: [gen/types.gen.ts:2095](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2095)

A deployed process.

## Properties

### processDefinitionId

```ts
processDefinitionId: ProcessDefinitionId;
```

Defined in: [gen/types.gen.ts:2101](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2101)

The bpmn process ID, as parsed during deployment, together with the version forms a
unique identifier for a specific process definition.

---

### processDefinitionKey

```ts
processDefinitionKey: ProcessDefinitionKey;
```

Defined in: [gen/types.gen.ts:2117](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2117)

The assigned key, which acts as a unique identifier for this process.

---

### processDefinitionVersion

```ts
processDefinitionVersion: number;
```

Defined in: [gen/types.gen.ts:2105](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2105)

The assigned process version.

---

### resourceName

```ts
resourceName: string;
```

Defined in: [gen/types.gen.ts:2109](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2109)

The resource name from which this process was parsed.

---

### tenantId

```ts
tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:2113](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2113)

The tenant ID of the deployed process.
