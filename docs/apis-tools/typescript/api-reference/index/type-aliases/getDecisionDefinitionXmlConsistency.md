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

Defined in: [gen/CamundaClient.ts:294](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L294)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getDecisionDefinitionXml>>;
```

Defined in: [gen/CamundaClient.ts:296](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L296)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
