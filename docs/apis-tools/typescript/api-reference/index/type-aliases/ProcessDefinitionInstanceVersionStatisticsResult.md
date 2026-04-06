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

Defined in: [gen/types.gen.ts:6015](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L6015)

Process definition instance version statistics response.

## Properties

### activeInstancesWithIncidentCount

```ts
activeInstancesWithIncidentCount: number;
```

Defined in: [gen/types.gen.ts:6039](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L6039)

The number of active process instances for this version that currently have incidents.

---

### activeInstancesWithoutIncidentCount

```ts
activeInstancesWithoutIncidentCount: number;
```

Defined in: [gen/types.gen.ts:6043](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L6043)

The number of active process instances for this version that do not have any incidents.

---

### processDefinitionId

```ts
processDefinitionId: ProcessDefinitionId;
```

Defined in: [gen/types.gen.ts:6019](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L6019)

The ID associated with the process definition.

---

### processDefinitionKey

```ts
processDefinitionKey: ProcessDefinitionKey;
```

Defined in: [gen/types.gen.ts:6023](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L6023)

The unique key of the process definition.

---

### processDefinitionName

```ts
processDefinitionName: string | null;
```

Defined in: [gen/types.gen.ts:6027](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L6027)

The name of the process definition.

---

### processDefinitionVersion

```ts
processDefinitionVersion: number;
```

Defined in: [gen/types.gen.ts:6035](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L6035)

The version number of the process definition.

---

### tenantId

```ts
tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:6031](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L6031)

The tenant ID associated with the process definition.
