---
title: "Type Alias: IncidentFilter"
sidebar_label: "IncidentFilter"
mdx:
  format: md
---

# Type Alias: IncidentFilter

```ts
type IncidentFilter = object;
```

Incident search filter.

## Properties

### creationTime?

```ts
optional creationTime?: DateTimeFilterProperty;
```

Date of incident creation.

---

### elementId?

```ts
optional elementId?: StringFilterProperty;
```

The element ID associated to this incident.

---

### elementInstanceKey?

```ts
optional elementInstanceKey?: ElementInstanceKeyFilterProperty;
```

The element instance key associated to this incident.

---

### errorMessage?

```ts
optional errorMessage?: StringFilterProperty;
```

The error message of this incident. For `$eq`, `$neq`, `$in`, and `$notIn`, matching is case-insensitive and matches if the incident's error message contains the given value as a phrase, not necessarily the entire error message. `$like` matches on individual words of the error message and does not support multi-word patterns.

---

### errorType?

```ts
optional errorType?: IncidentErrorTypeFilterProperty;
```

Incident error type with a defined set of values.

---

### incidentKey?

```ts
optional incidentKey?: BasicStringFilterProperty;
```

The assigned key, which acts as a unique identifier for this incident.

---

### jobKey?

```ts
optional jobKey?: JobKeyFilterProperty;
```

The job key, if exists, associated with this incident.

---

### processDefinitionId?

```ts
optional processDefinitionId?: StringFilterProperty;
```

The process definition ID associated to this incident.

---

### processDefinitionKey?

```ts
optional processDefinitionKey?: ProcessDefinitionKeyFilterProperty;
```

The process definition key associated to this incident.

---

### processInstanceKey?

```ts
optional processInstanceKey?: ProcessInstanceKeyFilterProperty;
```

The process instance key associated to this incident.

---

### state?

```ts
optional state?: IncidentStateFilterProperty;
```

State of this incident with a defined set of values.

---

### tenantId?

```ts
optional tenantId?: StringFilterProperty;
```

The tenant ID of the incident.
