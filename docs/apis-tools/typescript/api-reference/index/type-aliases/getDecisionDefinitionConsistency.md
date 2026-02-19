---
title: "Type Alias: getDecisionDefinitionConsistency"
sidebar_label: "getDecisionDefinitionConsistency"
mdx:
  format: md
---

# Type Alias: getDecisionDefinitionConsistency

```ts
type getDecisionDefinitionConsistency = object;
```

Defined in: [gen/CamundaClient.ts:321](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L321)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getDecisionDefinition>>;
```

Defined in: [gen/CamundaClient.ts:323](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L323)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
