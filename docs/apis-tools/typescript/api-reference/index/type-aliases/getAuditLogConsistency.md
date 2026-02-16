---
title: "Type Alias: getAuditLogConsistency"
sidebar_label: "getAuditLogConsistency"
mdx:
  format: md
---

# Type Alias: getAuditLogConsistency

```ts
type getAuditLogConsistency = object;
```

Defined in: [gen/CamundaClient.ts:295](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L295)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getAuditLog>>;
```

Defined in: [gen/CamundaClient.ts:297](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L297)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
