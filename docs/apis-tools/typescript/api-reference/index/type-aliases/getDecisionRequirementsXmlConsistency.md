---
title: "Type Alias: getDecisionRequirementsXmlConsistency"
sidebar_label: "getDecisionRequirementsXmlConsistency"
mdx:
  format: md
---

# Type Alias: getDecisionRequirementsXmlConsistency

```ts
type getDecisionRequirementsXmlConsistency = object;
```

Defined in: [gen/CamundaClient.ts:353](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L353)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getDecisionRequirementsXml>>;
```

Defined in: [gen/CamundaClient.ts:355](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L355)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
