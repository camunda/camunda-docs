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

Defined in: [gen/types.gen.ts:14711](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L14711)

## Properties

### body?

```ts
optional body: never;
```

Defined in: [gen/types.gen.ts:14712](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L14712)

***

### path?

```ts
optional path: never;
```

Defined in: [gen/types.gen.ts:14713](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L14713)

***

### query

```ts
query: object;
```

Defined in: [gen/types.gen.ts:14714](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L14714)

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

Defined in: [gen/types.gen.ts:14732](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L14732)
