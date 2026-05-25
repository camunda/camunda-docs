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

Process definition instance version statistics response.

## Properties

### activeInstancesWithIncidentCount

```ts
activeInstancesWithIncidentCount: number;
```

The number of active process instances for this version that currently have incidents.

---

### activeInstancesWithoutIncidentCount

```ts
activeInstancesWithoutIncidentCount: number;
```

The number of active process instances for this version that do not have any incidents.

---

### processDefinitionId

```ts
processDefinitionId: ProcessDefinitionId;
```

The ID associated with the process definition.

---

### processDefinitionKey

```ts
processDefinitionKey: ProcessDefinitionKey;
```

The unique key of the process definition.

---

### processDefinitionName

```ts
processDefinitionName: string | null;
```

The name of the process definition.

---

### processDefinitionVersion

```ts
processDefinitionVersion: number;
```

The version number of the process definition.

---

### tenantId

```ts
tenantId: TenantId;
```

The tenant ID associated with the process definition.
