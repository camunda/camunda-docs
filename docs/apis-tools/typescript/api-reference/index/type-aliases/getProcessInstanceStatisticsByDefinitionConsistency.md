---
title: "Type Alias: getProcessInstanceStatisticsByDefinitionConsistency"
sidebar_label: "getProcessInstanceStatisticsByDefinitionConsistency"
mdx:
  format: md
---

# Type Alias: getProcessInstanceStatisticsByDefinitionConsistency

```ts
type getProcessInstanceStatisticsByDefinitionConsistency = object;
```

Defined in: [gen/CamundaClient.ts:499](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L499)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<
  _DataOf<typeof Sdk.getProcessInstanceStatisticsByDefinition>
>;
```

Defined in: [gen/CamundaClient.ts:501](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L501)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
