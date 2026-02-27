---
title: "Type Alias: searchClusterVariablesConsistency"
sidebar_label: "searchClusterVariablesConsistency"
mdx:
  format: md
---

# Type Alias: searchClusterVariablesConsistency

```ts
type searchClusterVariablesConsistency = object;
```

Defined in: [gen/CamundaClient.ts:722](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L722)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchClusterVariables>>;
```

Defined in: [gen/CamundaClient.ts:724](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L724)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
