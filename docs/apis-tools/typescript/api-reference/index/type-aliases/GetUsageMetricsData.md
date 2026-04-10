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

## Properties

### body?

```ts
optional body?: never;
```

---

### path?

```ts
optional path?: never;
```

---

### query

```ts
query: object;
```

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
