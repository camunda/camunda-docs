---
title: "Type Alias: SearchMappingRulesForTenantData"
sidebar_label: "SearchMappingRulesForTenantData"
mdx:
  format: md
---

# Type Alias: SearchMappingRulesForTenantData

```ts
type SearchMappingRulesForTenantData = object;
```

Defined in: [gen/types.gen.ts:15342](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L15342)

## Properties

### body?

```ts
optional body?: MappingRuleSearchQueryRequest;
```

Defined in: [gen/types.gen.ts:15343](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L15343)

---

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:15344](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L15344)

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

Defined in: [gen/types.gen.ts:15350](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L15350)

---

### url

```ts
url: "/tenants/{tenantId}/mapping-rules/search";
```

Defined in: [gen/types.gen.ts:15351](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L15351)
