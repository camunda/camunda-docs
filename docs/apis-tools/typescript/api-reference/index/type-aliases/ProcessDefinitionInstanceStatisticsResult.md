---
title: "Type Alias: ProcessDefinitionInstanceStatisticsResult"
sidebar_label: "ProcessDefinitionInstanceStatisticsResult"
mdx:
  format: md
---

# Type Alias: ProcessDefinitionInstanceStatisticsResult

```ts
type ProcessDefinitionInstanceStatisticsResult = object;
```

Defined in: [gen/types.gen.ts:5285](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5285)

Process definition instance statistics response.

## Properties

### activeInstancesWithIncidentCount?

```ts
optional activeInstancesWithIncidentCount: number;
```

Defined in: [gen/types.gen.ts:5303](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5303)

Total number of currently active process instances of this definition that have at least one incident.

---

### activeInstancesWithoutIncidentCount?

```ts
optional activeInstancesWithoutIncidentCount: number;
```

Defined in: [gen/types.gen.ts:5299](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5299)

Total number of currently active process instances of this definition that do not have incidents.

---

### hasMultipleVersions?

```ts
optional hasMultipleVersions: boolean;
```

Defined in: [gen/types.gen.ts:5295](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5295)

Indicates whether multiple versions of this process definition instance are deployed.

---

### latestProcessDefinitionName?

```ts
optional latestProcessDefinitionName: string;
```

Defined in: [gen/types.gen.ts:5291](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5291)

Name of the latest deployed process definition instance version.

---

### processDefinitionId?

```ts
optional processDefinitionId: ProcessDefinitionId;
```

Defined in: [gen/types.gen.ts:5286](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5286)

---

### tenantId?

```ts
optional tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:5287](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5287)
