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

Process definition instance statistics response.

## Properties

### activeInstancesWithIncidentCount

```ts
activeInstancesWithIncidentCount: number;
```

Total number of currently active process instances of this definition that have at least one incident.

---

### activeInstancesWithoutIncidentCount

```ts
activeInstancesWithoutIncidentCount: number;
```

Total number of currently active process instances of this definition that do not have incidents.

---

### hasMultipleVersions

```ts
hasMultipleVersions: boolean;
```

Indicates whether multiple versions of this process definition instance are deployed.

---

### latestProcessDefinitionName

```ts
latestProcessDefinitionName: string | null;
```

Name of the latest deployed process definition instance version.

---

### processDefinitionId

```ts
processDefinitionId: ProcessDefinitionId;
```

---

### tenantId

```ts
tenantId: TenantId;
```
