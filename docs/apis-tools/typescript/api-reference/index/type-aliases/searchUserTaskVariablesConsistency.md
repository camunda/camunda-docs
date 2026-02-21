---
title: "Type Alias: searchUserTaskVariablesConsistency"
sidebar_label: "searchUserTaskVariablesConsistency"
mdx:
  format: md
---

# Type Alias: searchUserTaskVariablesConsistency

```ts
type searchUserTaskVariablesConsistency = object;
```

Defined in: [gen/CamundaClient.ts:977](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L977)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchUserTaskVariables>>;
```

Defined in: [gen/CamundaClient.ts:979](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L979)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
