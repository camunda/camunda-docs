---
title: "Type Alias: ProcessDefinitionFilter"
sidebar_label: "ProcessDefinitionFilter"
mdx:
  format: md
---

# Type Alias: ProcessDefinitionFilter

```ts
type ProcessDefinitionFilter = object;
```

Defined in: [gen/types.gen.ts:5754](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5754)

Process definition search filter.

## Properties

### hasStartForm?

```ts
optional hasStartForm?: boolean;
```

Defined in: [gen/types.gen.ts:5794](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5794)

Indicates whether the start event of the process has an associated Form Key.

---

### isLatestVersion?

```ts
optional isLatestVersion?: boolean;
```

Defined in: [gen/types.gen.ts:5766](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5766)

Whether to only return the latest version of each process definition.
When using this filter, pagination functionality is limited, you can only paginate forward using `after` and `limit`.
The response contains no `startCursor` in the `page`, and requests ignore the `from` and `before` in the `page`.
When using this filter, sorting is limited to `processDefinitionId` and `tenantId` fields only.

---

### name?

```ts
optional name?: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:5758](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5758)

Name of this process definition.

---

### processDefinitionId?

```ts
optional processDefinitionId?: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:5782](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5782)

Process definition ID of this process definition.

---

### processDefinitionKey?

```ts
optional processDefinitionKey?: ProcessDefinitionKey;
```

Defined in: [gen/types.gen.ts:5790](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5790)

The key for this process definition.

---

### resourceName?

```ts
optional resourceName?: string;
```

Defined in: [gen/types.gen.ts:5770](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5770)

Resource name of this process definition.

---

### tenantId?

```ts
optional tenantId?: TenantId;
```

Defined in: [gen/types.gen.ts:5786](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5786)

Tenant ID of this process definition.

---

### version?

```ts
optional version?: number;
```

Defined in: [gen/types.gen.ts:5774](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5774)

Version of this process definition.

---

### versionTag?

```ts
optional versionTag?: string;
```

Defined in: [gen/types.gen.ts:5778](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L5778)

Version tag of this process definition.
