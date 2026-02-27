---
title: "Type Alias: ProcessDefinitionInstanceVersionStatisticsFilter"
sidebar_label: "ProcessDefinitionInstanceVersionStatisticsFilter"
mdx:
  format: md
---

# Type Alias: ProcessDefinitionInstanceVersionStatisticsFilter

```ts
type ProcessDefinitionInstanceVersionStatisticsFilter = object;
```

Defined in: [gen/types.gen.ts:5332](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5332)

Process definition instance version statistics search filter.

## Properties

### processDefinitionId

```ts
processDefinitionId: ProcessDefinitionId;
```

Defined in: [gen/types.gen.ts:5336](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5336)

The ID of the process definition to retrieve version statistics for.

---

### tenantId?

```ts
optional tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:5340](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5340)

Tenant ID of this process definition.
