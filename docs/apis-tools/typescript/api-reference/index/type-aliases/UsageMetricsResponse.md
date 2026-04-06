---
title: "Type Alias: UsageMetricsResponse"
sidebar_label: "UsageMetricsResponse"
mdx:
  format: md
---

# Type Alias: UsageMetricsResponse

```ts
type UsageMetricsResponse = UsageMetricsResponseItem & object;
```

Defined in: [gen/types.gen.ts:7243](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L7243)

## Type Declaration

### activeTenants

```ts
activeTenants: number;
```

The amount of active tenants.

### tenants

```ts
tenants: object;
```

The usage metrics by tenants. Only available if request `withTenants` query parameter was `true`.

#### Index Signature

```ts
[key: string]: UsageMetricsResponseItem
```
