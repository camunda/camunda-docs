---
title: "Type Alias: searchClientsForRoleConsistency"
sidebar_label: "searchClientsForRoleConsistency"
mdx:
  format: md
---

# Type Alias: searchClientsForRoleConsistency

```ts
type searchClientsForRoleConsistency = object;
```

Defined in: [gen/CamundaClient.ts:704](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L704)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchClientsForRole>>;
```

Defined in: [gen/CamundaClient.ts:706](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L706)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
