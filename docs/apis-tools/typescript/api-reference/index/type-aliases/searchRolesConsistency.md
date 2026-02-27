---
title: "Type Alias: searchRolesConsistency"
sidebar_label: "searchRolesConsistency"
mdx:
  format: md
---

# Type Alias: searchRolesConsistency

```ts
type searchRolesConsistency = object;
```

Defined in: [gen/CamundaClient.ts:889](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L889)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchRoles>>;
```

Defined in: [gen/CamundaClient.ts:891](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L891)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
