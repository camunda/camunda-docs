---
title: "Type Alias: searchProcessDefinitionsConsistency"
sidebar_label: "searchProcessDefinitionsConsistency"
mdx:
  format: md
---

# Type Alias: searchProcessDefinitionsConsistency

```ts
type searchProcessDefinitionsConsistency = object;
```

Defined in: [gen/CamundaClient.ts:864](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L864)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchProcessDefinitions>>;
```

Defined in: [gen/CamundaClient.ts:866](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L866)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
