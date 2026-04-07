---
title: "Type Alias: AssignMappingRuleToTenantData"
sidebar_label: "AssignMappingRuleToTenantData"
mdx:
  format: md
---

# Type Alias: AssignMappingRuleToTenantData

```ts
type AssignMappingRuleToTenantData = object;
```

Defined in: [gen/types.gen.ts:15419](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L15419)

## Properties

### body?

```ts
optional body?: never;
```

Defined in: [gen/types.gen.ts:15420](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L15420)

---

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:15421](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L15421)

#### mappingRuleId

```ts
mappingRuleId: string;
```

The unique identifier of the mapping rule.

#### tenantId

```ts
tenantId: TenantId;
```

The unique identifier of the tenant.

---

### query?

```ts
optional query?: never;
```

Defined in: [gen/types.gen.ts:15431](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L15431)

---

### url

```ts
url: "/tenants/{tenantId}/mapping-rules/{mappingRuleId}";
```

Defined in: [gen/types.gen.ts:15432](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L15432)
