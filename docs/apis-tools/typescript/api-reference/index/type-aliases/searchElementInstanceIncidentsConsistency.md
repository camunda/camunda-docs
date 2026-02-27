---
title: "Type Alias: searchElementInstanceIncidentsConsistency"
sidebar_label: "searchElementInstanceIncidentsConsistency"
mdx:
  format: md
---

# Type Alias: searchElementInstanceIncidentsConsistency

```ts
type searchElementInstanceIncidentsConsistency = object;
```

Defined in: [gen/CamundaClient.ts:763](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L763)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<
  _DataOf<typeof Sdk.searchElementInstanceIncidents>
>;
```

Defined in: [gen/CamundaClient.ts:765](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L765)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
