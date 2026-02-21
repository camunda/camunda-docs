---
title: "Type Alias: ProcessDefinitionInstanceVersionStatisticsResult"
sidebar_label: "ProcessDefinitionInstanceVersionStatisticsResult"
mdx:
  format: md
---

# Type Alias: ProcessDefinitionInstanceVersionStatisticsResult

```ts
type ProcessDefinitionInstanceVersionStatisticsResult = object;
```

Defined in: [gen/types.gen.ts:5353](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5353)

Process definition instance version statistics response.

## Properties

### activeInstancesWithIncidentCount

```ts
activeInstancesWithIncidentCount: number;
```

Defined in: [gen/types.gen.ts:5377](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5377)

The number of active process instances for this version that currently have incidents.

---

### activeInstancesWithoutIncidentCount

```ts
activeInstancesWithoutIncidentCount: number;
```

Defined in: [gen/types.gen.ts:5381](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5381)

The number of active process instances for this version that do not have any incidents.

---

### processDefinitionId

```ts
processDefinitionId: ProcessDefinitionId;
```

Defined in: [gen/types.gen.ts:5357](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5357)

The ID associated with the process definition.

---

### processDefinitionKey

```ts
processDefinitionKey: ProcessDefinitionKey;
```

Defined in: [gen/types.gen.ts:5361](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5361)

The unique key of the process definition.

---

### processDefinitionName

```ts
processDefinitionName: string;
```

Defined in: [gen/types.gen.ts:5365](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5365)

The name of the process definition.

---

### processDefinitionVersion

```ts
processDefinitionVersion: number;
```

Defined in: [gen/types.gen.ts:5373](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5373)

The version number of the process definition.

---

### tenantId

```ts
tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:5369](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5369)

The tenant ID associated with the process definition.
