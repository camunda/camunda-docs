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

Defined in: [gen/CamundaClient.ts:505](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L505)

Management of eventual consistency *

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getProcessInstanceStatisticsByDefinition>>;
```

Defined in: [gen/CamundaClient.ts:507](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/CamundaClient.ts#L507)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
