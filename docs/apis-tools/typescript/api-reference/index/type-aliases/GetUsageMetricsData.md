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

Defined in: [gen/types.gen.ts:14765](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L14765)

## Properties

### body?

```ts
optional body?: never;
```

Defined in: [gen/types.gen.ts:14766](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L14766)

---

### path?

```ts
optional path?: never;
```

Defined in: [gen/types.gen.ts:14767](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L14767)

---

### query

```ts
query: object;
```

Defined in: [gen/types.gen.ts:14768](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L14768)

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
optional tenantId?: TenantId;
```

Restrict results to a specific tenant ID. If not provided, results for all tenants are returned.

#### withTenants?

```ts
optional withTenants?: boolean;
```

Whether to return tenant metrics in addition to the total metrics or not. Default false.

---

### url

```ts
url: "/system/usage-metrics";
```

Defined in: [gen/types.gen.ts:14786](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L14786)
