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

Defined in: [gen/types.gen.ts:7283](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L7283)

Configuration for job metrics collection and export.

## Properties

### enabled

```ts
enabled: boolean;
```

Defined in: [gen/types.gen.ts:7287](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L7287)

Whether job metrics export is enabled.

---

### exportInterval

```ts
exportInterval: string;
```

Defined in: [gen/types.gen.ts:7291](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L7291)

The interval at which job metrics are exported, as an ISO 8601 duration.

---

### maxJobTypeLength

```ts
maxJobTypeLength: number;
```

Defined in: [gen/types.gen.ts:7299](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L7299)

The maximum length of the job type used in job metrics labels.

---

### maxTenantIdLength

```ts
maxTenantIdLength: number;
```

Defined in: [gen/types.gen.ts:7303](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L7303)

The maximum length of the tenant ID used in job metrics labels.

---

### maxUniqueKeys

```ts
maxUniqueKeys: number;
```

Defined in: [gen/types.gen.ts:7307](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L7307)

The maximum number of unique metric keys tracked for job metrics.

---

### maxWorkerNameLength

```ts
maxWorkerNameLength: number;
```

Defined in: [gen/types.gen.ts:7295](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L7295)

The maximum length of the worker name used in job metrics labels.
