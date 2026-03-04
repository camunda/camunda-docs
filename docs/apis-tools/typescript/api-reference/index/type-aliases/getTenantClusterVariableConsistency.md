---
title: "Type Alias: getTenantClusterVariableConsistency"
sidebar_label: "getTenantClusterVariableConsistency"
mdx:
  format: md
---

# Type Alias: getTenantClusterVariableConsistency

```ts
type getTenantClusterVariableConsistency = object;
```

Defined in: [gen/CamundaClient.ts:548](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L548)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getTenantClusterVariable>>;
```

Defined in: [gen/CamundaClient.ts:550](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L550)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
