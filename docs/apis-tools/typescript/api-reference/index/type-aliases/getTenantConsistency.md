---
title: "Type Alias: getTenantConsistency"
sidebar_label: "getTenantConsistency"
mdx:
  format: md
---

# Type Alias: getTenantConsistency

```ts
type getTenantConsistency = object;
```

Defined in: [gen/CamundaClient.ts:539](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L539)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getTenant>>;
```

Defined in: [gen/CamundaClient.ts:541](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L541)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
