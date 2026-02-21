---
title: "Type Alias: resolveIncidentsBatchOperationConsistency"
sidebar_label: "resolveIncidentsBatchOperationConsistency"
mdx:
  format: md
---

# Type Alias: resolveIncidentsBatchOperationConsistency

```ts
type resolveIncidentsBatchOperationConsistency = object;
```

Defined in: [gen/CamundaClient.ts:637](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L637)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<
  _DataOf<typeof Sdk.resolveIncidentsBatchOperation>
>;
```

Defined in: [gen/CamundaClient.ts:639](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L639)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
