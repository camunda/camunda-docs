---
title: "Type Alias: GetUsageMetricsData"
sidebar_label: "GetUsageMetricsData"
mdx:
  format: md
---

# Type Alias: GetUsageMetricsData

```ts
type GetUsageMetricsData = object;
```

Defined in: [gen/types.gen.ts:14560](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L14560)

## Properties

### body?

```ts
optional body: never;
```

Defined in: [gen/types.gen.ts:14561](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L14561)

***

### path?

```ts
optional path: never;
```

Defined in: [gen/types.gen.ts:14562](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L14562)

***

### query

```ts
query: object;
```

Defined in: [gen/types.gen.ts:14563](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L14563)

#### endTime

```ts
endTime: string;
```

The end date for usage metrics, including this date. Value in ISO 8601 format.

#### startTime

```ts
startTime: string;
```

The start date for usage metrics, including this date. Value in ISO 8601 format.

#### tenantId?

```ts
optional tenantId: TenantId;
```

Restrict results to a specific tenant ID. If not provided, results for all tenants are returned.

#### withTenants?

```ts
optional withTenants: boolean;
```

Whether to return tenant metrics in addition to the total metrics or not. Default false.

***

### url

```ts
url: "/system/usage-metrics";
```

Defined in: [gen/types.gen.ts:14581](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L14581)
