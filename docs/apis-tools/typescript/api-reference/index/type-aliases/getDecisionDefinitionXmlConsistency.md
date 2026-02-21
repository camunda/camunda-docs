---
title: "Type Alias: getDecisionDefinitionXmlConsistency"
sidebar_label: "getDecisionDefinitionXmlConsistency"
mdx:
  format: md
---

# Type Alias: getDecisionDefinitionXmlConsistency

```ts
type getDecisionDefinitionXmlConsistency = object;
```

Defined in: [gen/CamundaClient.ts:329](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L329)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getDecisionDefinitionXml>>;
```

Defined in: [gen/CamundaClient.ts:331](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L331)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
