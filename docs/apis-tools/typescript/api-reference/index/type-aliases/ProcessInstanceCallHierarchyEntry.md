---
title: "Type Alias: ProcessInstanceCallHierarchyEntry"
sidebar_label: "ProcessInstanceCallHierarchyEntry"
mdx:
  format: md
---

# Type Alias: ProcessInstanceCallHierarchyEntry

```ts
type ProcessInstanceCallHierarchyEntry = object;
```

Defined in: [gen/types.gen.ts:6565](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L6565)

## Properties

### processDefinitionKey

```ts
processDefinitionKey: ProcessDefinitionKey;
```

Defined in: [gen/types.gen.ts:6573](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L6573)

The key of the process definition.

---

### processDefinitionName

```ts
processDefinitionName: string;
```

Defined in: [gen/types.gen.ts:6577](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L6577)

The name of the process definition (fall backs to the process definition id if not available).

---

### processInstanceKey

```ts
processInstanceKey: ProcessInstanceKey;
```

Defined in: [gen/types.gen.ts:6569](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L6569)

The key of the process instance.
