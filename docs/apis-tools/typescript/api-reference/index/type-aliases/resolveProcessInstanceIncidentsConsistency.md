---
title: "Type Alias: resolveProcessInstanceIncidentsConsistency"
sidebar_label: "resolveProcessInstanceIncidentsConsistency"
mdx:
  format: md
---

# Type Alias: resolveProcessInstanceIncidentsConsistency

```ts
type resolveProcessInstanceIncidentsConsistency = object;
```

Defined in: [gen/CamundaClient.ts:645](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L645)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<
  _DataOf<typeof Sdk.resolveProcessInstanceIncidents>
>;
```

Defined in: [gen/CamundaClient.ts:647](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L647)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
