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

Defined in: [gen/types.gen.ts:7158](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7158)

## Type Declaration

### activeTenants?

```ts
optional activeTenants: number;
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
