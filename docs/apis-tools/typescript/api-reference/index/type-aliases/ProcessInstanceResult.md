---
title: "Type Alias: ProcessInstanceResult"
sidebar_label: "ProcessInstanceResult"
mdx:
  format: md
---

# Type Alias: ProcessInstanceResult

```ts
type ProcessInstanceResult = object;
```

Defined in: [gen/types.gen.ts:6499](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L6499)

Process instance search response item.

## Properties

### businessId

```ts
businessId: BusinessId | null;
```

Defined in: [gen/types.gen.ts:6554](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L6554)

The business id associated with this process instance.

---

### endDate

```ts
endDate: string | null;
```

Defined in: [gen/types.gen.ts:6520](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L6520)

The completion or termination time of the process instance.

---

### hasIncident

```ts
hasIncident: boolean;
```

Defined in: [gen/types.gen.ts:6525](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L6525)

Whether this process instance has a related incident or not.

---

### parentElementInstanceKey

```ts
parentElementInstanceKey: ElementInstanceKey | null;
```

Defined in: [gen/types.gen.ts:6542](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L6542)

The parent element instance key.

---

### parentProcessInstanceKey

```ts
parentProcessInstanceKey: ProcessInstanceKey | null;
```

Defined in: [gen/types.gen.ts:6538](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L6538)

The parent process instance key.

---

### processDefinitionId

```ts
processDefinitionId: ProcessDefinitionId;
```

Defined in: [gen/types.gen.ts:6500](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L6500)

---

### processDefinitionKey

```ts
processDefinitionKey: ProcessDefinitionKey;
```

Defined in: [gen/types.gen.ts:6534](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L6534)

The process definition key.

---

### processDefinitionName

```ts
processDefinitionName: string | null;
```

Defined in: [gen/types.gen.ts:6504](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L6504)

The process definition name.

---

### processDefinitionVersion

```ts
processDefinitionVersion: number;
```

Defined in: [gen/types.gen.ts:6508](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L6508)

The process definition version.

---

### processDefinitionVersionTag

```ts
processDefinitionVersionTag: string | null;
```

Defined in: [gen/types.gen.ts:6512](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L6512)

The process definition version tag.

---

### processInstanceKey

```ts
processInstanceKey: ProcessInstanceKey;
```

Defined in: [gen/types.gen.ts:6530](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L6530)

The key of this process instance.

---

### rootProcessInstanceKey

```ts
rootProcessInstanceKey: ProcessInstanceKey | null;
```

Defined in: [gen/types.gen.ts:6549](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L6549)

The key of the root process instance. The root process instance is the top-level
ancestor in the process instance hierarchy. This field is only present for data
belonging to process instance hierarchies created in version 8.9 or later.

---

### startDate

```ts
startDate: string;
```

Defined in: [gen/types.gen.ts:6516](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L6516)

The start time of the process instance.

---

### state

```ts
state: ProcessInstanceStateEnum;
```

Defined in: [gen/types.gen.ts:6521](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L6521)

---

### tags

```ts
tags: TagSet;
```

Defined in: [gen/types.gen.ts:6550](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L6550)

---

### tenantId

```ts
tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:6526](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L6526)
