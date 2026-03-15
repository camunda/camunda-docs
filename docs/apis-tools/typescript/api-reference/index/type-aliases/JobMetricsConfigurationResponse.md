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

Defined in: [gen/types.gen.ts:7273](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L7273)

Configuration for job metrics collection and export.

## Properties

### enabled

```ts
enabled: boolean;
```

Defined in: [gen/types.gen.ts:7277](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L7277)

Whether job metrics export is enabled.

***

### exportInterval

```ts
exportInterval: string;
```

Defined in: [gen/types.gen.ts:7281](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L7281)

The interval at which job metrics are exported, as an ISO 8601 duration.

***

### maxJobTypeLength

```ts
maxJobTypeLength: number;
```

Defined in: [gen/types.gen.ts:7289](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L7289)

The maximum length of the job type used in job metrics labels.

***

### maxTenantIdLength

```ts
maxTenantIdLength: number;
```

Defined in: [gen/types.gen.ts:7293](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L7293)

The maximum length of the tenant ID used in job metrics labels.

***

### maxUniqueKeys

```ts
maxUniqueKeys: number;
```

Defined in: [gen/types.gen.ts:7297](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L7297)

The maximum number of unique metric keys tracked for job metrics.

***

### maxWorkerNameLength

```ts
maxWorkerNameLength: number;
```

Defined in: [gen/types.gen.ts:7285](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L7285)

The maximum length of the worker name used in job metrics labels.
