---
title: "Type Alias: getVariableConsistency"
sidebar_label: "getVariableConsistency"
mdx:
  format: md
---

# Type Alias: getVariableConsistency

```ts
type getVariableConsistency = object;
```

Defined in: [gen/CamundaClient.ts:593](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L593)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getVariable>>;
```

Defined in: [gen/CamundaClient.ts:595](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L595)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
