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

Defined in: [gen/types.gen.ts:15472](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L15472)

## Properties

### body?

```ts
optional body: never;
```

Defined in: [gen/types.gen.ts:15473](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L15473)

---

### path?

```ts
optional path: never;
```

Defined in: [gen/types.gen.ts:15474](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L15474)

---

### query

```ts
query: object;
```

Defined in: [gen/types.gen.ts:15475](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L15475)

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

---

### url

```ts
url: "/system/usage-metrics";
```

Defined in: [gen/types.gen.ts:15493](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L15493)
