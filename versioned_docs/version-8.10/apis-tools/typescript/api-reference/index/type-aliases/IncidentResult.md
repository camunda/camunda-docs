---
title: "Type Alias: IncidentResult"
sidebar_label: "IncidentResult"
mdx:
  format: md
---

# Type Alias: IncidentResult

```ts
type IncidentResult = object;
```

## Properties

### creationTime

```ts
creationTime: string;
```

The creation time of the incident.

---

### elementId

```ts
elementId: ElementId;
```

The element ID associated to this incident.

---

### elementInstanceKey

```ts
elementInstanceKey: ElementInstanceKey;
```

The element instance key associated to this incident.

---

### errorMessage

```ts
errorMessage: string;
```

Error message which describes the error in more detail.

---

### errorType

```ts
errorType: IncidentErrorTypeEnum;
```

The type of the incident error.

---

### incidentKey

```ts
incidentKey: IncidentKey;
```

The assigned key, which acts as a unique identifier for this incident.

---

### jobKey

```ts
jobKey: JobKey | null;
```

The job key, if exists, associated with this incident.

---

### processDefinitionId

```ts
processDefinitionId: ProcessDefinitionId;
```

The process definition ID associated to this incident.

---

### processDefinitionKey

```ts
processDefinitionKey: ProcessDefinitionKey;
```

The process definition key associated to this incident.

---

### processInstanceKey

```ts
processInstanceKey: ProcessInstanceKey;
```

The process instance key associated to this incident.

---

### rootProcessInstanceKey

```ts
rootProcessInstanceKey: ProcessInstanceKey | null;
```

The key of the root process instance. The root process instance is the top-level
ancestor in the process instance hierarchy. This field is only present for data
belonging to process instance hierarchies created in version 8.9 or later.

---

### state

```ts
state: IncidentStateEnum;
```

The incident state.

---

### tenantId

```ts
tenantId: TenantId;
```

The tenant ID of the incident.
