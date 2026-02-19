---
title: "Type Alias: searchIncidentsConsistency"
sidebar_label: "searchIncidentsConsistency"
mdx:
  format: md
---

# Type Alias: searchIncidentsConsistency

```ts
type searchIncidentsConsistency = object;
```

Defined in: [gen/CamundaClient.ts:805](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L805)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchIncidents>>;
```

Defined in: [gen/CamundaClient.ts:807](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L807)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
