---
title: "Type Alias: searchProcessInstanceIncidentsConsistency"
sidebar_label: "searchProcessInstanceIncidentsConsistency"
mdx:
  format: md
---

# Type Alias: searchProcessInstanceIncidentsConsistency

```ts
type searchProcessInstanceIncidentsConsistency = object;
```

Defined in: [gen/CamundaClient.ts:873](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L873)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<
  _DataOf<typeof Sdk.searchProcessInstanceIncidents>
>;
```

Defined in: [gen/CamundaClient.ts:875](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L875)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
