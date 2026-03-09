---
title: "Type Alias: getProcessDefinitionConsistency"
sidebar_label: "getProcessDefinitionConsistency"
mdx:
  format: md
---

# Type Alias: getProcessDefinitionConsistency

```ts
type getProcessDefinitionConsistency = object;
```

Defined in: [gen/CamundaClient.ts:418](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L418)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getProcessDefinition>>;
```

Defined in: [gen/CamundaClient.ts:420](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L420)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
