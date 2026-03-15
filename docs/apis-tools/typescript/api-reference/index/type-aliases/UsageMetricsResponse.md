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

Defined in: [gen/types.gen.ts:7233](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L7233)

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
