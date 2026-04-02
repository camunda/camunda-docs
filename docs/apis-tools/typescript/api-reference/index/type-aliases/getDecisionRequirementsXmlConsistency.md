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

Defined in: [gen/CamundaClient.ts:318](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L318)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getDecisionRequirementsXml>>;
```

Defined in: [gen/CamundaClient.ts:320](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/CamundaClient.ts#L320)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
