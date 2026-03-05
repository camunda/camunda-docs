---
title: "Type Alias: searchVariablesConsistency"
sidebar_label: "searchVariablesConsistency"
mdx:
  format: md
---

# Type Alias: searchVariablesConsistency

```ts
type searchVariablesConsistency = object;
```

Defined in: [gen/CamundaClient.ts:986](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L986)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchVariables>>;
```

Defined in: [gen/CamundaClient.ts:988](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L988)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
