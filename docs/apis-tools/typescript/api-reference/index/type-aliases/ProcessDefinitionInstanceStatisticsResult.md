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

Defined in: [gen/types.gen.ts:5947](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5947)

Process definition instance statistics response.

## Properties

### activeInstancesWithIncidentCount

```ts
activeInstancesWithIncidentCount: number;
```

Defined in: [gen/types.gen.ts:5965](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5965)

Total number of currently active process instances of this definition that have at least one incident.

---

### activeInstancesWithoutIncidentCount

```ts
activeInstancesWithoutIncidentCount: number;
```

Defined in: [gen/types.gen.ts:5961](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5961)

Total number of currently active process instances of this definition that do not have incidents.

---

### hasMultipleVersions

```ts
hasMultipleVersions: boolean;
```

Defined in: [gen/types.gen.ts:5957](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5957)

Indicates whether multiple versions of this process definition instance are deployed.

---

### latestProcessDefinitionName

```ts
latestProcessDefinitionName: string | null;
```

Defined in: [gen/types.gen.ts:5953](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5953)

Name of the latest deployed process definition instance version.

---

### processDefinitionId

```ts
processDefinitionId: ProcessDefinitionId;
```

Defined in: [gen/types.gen.ts:5948](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5948)

---

### tenantId

```ts
tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:5949](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5949)
