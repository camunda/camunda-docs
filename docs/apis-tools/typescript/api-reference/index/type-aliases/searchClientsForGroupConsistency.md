---
title: "Type Alias: searchClientsForGroupConsistency"
sidebar_label: "searchClientsForGroupConsistency"
mdx:
  format: md
---

# Type Alias: searchClientsForGroupConsistency

```ts
type searchClientsForGroupConsistency = object;
```

Defined in: [gen/CamundaClient.ts:695](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L695)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchClientsForGroup>>;
```

Defined in: [gen/CamundaClient.ts:697](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L697)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
