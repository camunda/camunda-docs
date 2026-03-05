---
title: "Type Alias: GetProcessDefinitionInstanceVersionStatisticsData"
sidebar_label: "GetProcessDefinitionInstanceVersionStatisticsData"
mdx:
  format: md
---

# Type Alias: GetProcessDefinitionInstanceVersionStatisticsData

```ts
type GetProcessDefinitionInstanceVersionStatisticsData = object;
```

Defined in: [gen/types.gen.ts:13156](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L13156)

## Properties

### body

```ts
body: object;
```

Defined in: [gen/types.gen.ts:13157](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L13157)

#### filter

```ts
filter: ProcessDefinitionInstanceVersionStatisticsFilter;
```

The process definition instance version statistics search filters.

#### page?

```ts
optional page: OffsetPagination;
```

Pagination criteria.

#### sort?

```ts
optional sort: object[];
```

Sort field criteria.

---

### path?

```ts
optional path: never;
```

Defined in: [gen/types.gen.ts:13177](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L13177)

---

### query?

```ts
optional query: never;
```

Defined in: [gen/types.gen.ts:13178](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L13178)

---

### url

```ts
url: "/process-definitions/statistics/process-instances-by-version";
```

Defined in: [gen/types.gen.ts:13179](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L13179)
