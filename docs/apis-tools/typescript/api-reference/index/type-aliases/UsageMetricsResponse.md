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
