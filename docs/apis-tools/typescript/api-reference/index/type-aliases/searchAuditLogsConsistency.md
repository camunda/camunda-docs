---
title: "Type Alias: searchAuditLogsConsistency"
sidebar_label: "searchAuditLogsConsistency"
mdx:
  format: md
---

# Type Alias: searchAuditLogsConsistency

```ts
type searchAuditLogsConsistency = object;
```

Defined in: [gen/CamundaClient.ts:662](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L662)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchAuditLogs>>;
```

Defined in: [gen/CamundaClient.ts:664](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L664)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
