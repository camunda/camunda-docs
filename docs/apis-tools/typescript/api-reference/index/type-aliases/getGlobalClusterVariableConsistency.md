---
title: "Type Alias: getGlobalClusterVariableConsistency"
sidebar_label: "getGlobalClusterVariableConsistency"
mdx:
  format: md
---

# Type Alias: getGlobalClusterVariableConsistency

```ts
type getGlobalClusterVariableConsistency = object;
```

Defined in: [gen/CamundaClient.ts:374](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L374)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getGlobalClusterVariable>>;
```

Defined in: [gen/CamundaClient.ts:376](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L376)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
