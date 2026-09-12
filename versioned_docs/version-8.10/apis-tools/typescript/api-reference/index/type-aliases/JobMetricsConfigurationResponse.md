---
title: "Type Alias: JobMetricsConfigurationResponse"
sidebar_label: "JobMetricsConfigurationResponse"
mdx:
  format: md
---

# Type Alias: JobMetricsConfigurationResponse

```ts
type JobMetricsConfigurationResponse = object;
```

Configuration for job metrics collection and export.

## Properties

### enabled

```ts
enabled: boolean;
```

Whether job metrics export is enabled.

---

### exportInterval

```ts
exportInterval: string;
```

The interval at which job metrics are exported, as an ISO 8601 duration.

---

### maxJobTypeLength

```ts
maxJobTypeLength: number;
```

The maximum length of the job type used in job metrics labels.

---

### maxTenantIdLength

```ts
maxTenantIdLength: number;
```

The maximum length of the tenant ID used in job metrics labels.

---

### maxUniqueKeys

```ts
maxUniqueKeys: number;
```

The maximum number of unique metric keys tracked for job metrics.

---

### maxWorkerNameLength

```ts
maxWorkerNameLength: number;
```

The maximum length of the worker name used in job metrics labels.
