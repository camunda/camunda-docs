---
title: "Type Alias: getProcessDefinitionXmlConsistency"
sidebar_label: "getProcessDefinitionXmlConsistency"
mdx:
  format: md
---

# Type Alias: getProcessDefinitionXmlConsistency

```ts
type getProcessDefinitionXmlConsistency = object;
```

Defined in: [gen/CamundaClient.ts:459](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L459)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getProcessDefinitionXml>>;
```

Defined in: [gen/CamundaClient.ts:461](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L461)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
