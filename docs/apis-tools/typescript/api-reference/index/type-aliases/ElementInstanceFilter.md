---
title: "Type Alias: ElementInstanceFilter"
sidebar_label: "ElementInstanceFilter"
mdx:
  format: md
---

# Type Alias: ElementInstanceFilter

```ts
type ElementInstanceFilter = object;
```

Element instance filter.

## Properties

### elementId?

```ts
optional elementId?: ElementId;
```

The element ID for this element instance.

---

### elementInstanceKey?

```ts
optional elementInstanceKey?: ElementInstanceKey;
```

The assigned key, which acts as a unique identifier for this element instance.

---

### elementInstanceScopeKey?

```ts
optional elementInstanceScopeKey?:
  | ElementInstanceKey
  | ProcessInstanceKey;
```

The scope key of this element instance. If provided with a process instance key it will return element instances that are immediate children of the process instance. If provided with an element instance key it will return element instances that are immediate children of the element instance.

---

### elementName?

```ts
optional elementName?: string;
```

The element name. This only works for data created with 8.8 and onwards. Instances from prior versions don't contain this data and cannot be found.

---

### endDate?

```ts
optional endDate?: DateTimeFilterProperty;
```

The end date of this element instance.

---

### hasIncident?

```ts
optional hasIncident?: boolean;
```

Shows whether this element instance has an incident related to.

---

### incidentKey?

```ts
optional incidentKey?: IncidentKey;
```

The key of incident if field incident is true.

---

### processDefinitionId?

```ts
optional processDefinitionId?: ProcessDefinitionId;
```

The process definition ID associated to this element instance.

---

### processDefinitionKey?

```ts
optional processDefinitionKey?: ProcessDefinitionKey;
```

The process definition key associated to this element instance.

---

### processInstanceKey?

```ts
optional processInstanceKey?: ProcessInstanceKey;
```

The process instance key associated to this element instance.

---

### startDate?

```ts
optional startDate?: DateTimeFilterProperty;
```

The start date of this element instance.

---

### state?

```ts
optional state?: ElementInstanceStateFilterProperty;
```

State of element instance as defined set of values.

---

### tenantId?

```ts
optional tenantId?: TenantId;
```

---

### type?

```ts
optional type?:
  | "UNSPECIFIED"
  | "PROCESS"
  | "SUB_PROCESS"
  | "EVENT_SUB_PROCESS"
  | "AD_HOC_SUB_PROCESS"
  | "AD_HOC_SUB_PROCESS_INNER_INSTANCE"
  | "START_EVENT"
  | "INTERMEDIATE_CATCH_EVENT"
  | "INTERMEDIATE_THROW_EVENT"
  | "BOUNDARY_EVENT"
  | "END_EVENT"
  | "SERVICE_TASK"
  | "RECEIVE_TASK"
  | "USER_TASK"
  | "MANUAL_TASK"
  | "TASK"
  | "EXCLUSIVE_GATEWAY"
  | "INCLUSIVE_GATEWAY"
  | "PARALLEL_GATEWAY"
  | "EVENT_BASED_GATEWAY"
  | "SEQUENCE_FLOW"
  | "MULTI_INSTANCE_BODY"
  | "CALL_ACTIVITY"
  | "BUSINESS_RULE_TASK"
  | "SCRIPT_TASK"
  | "SEND_TASK"
  | "UNKNOWN";
```

Type of element as defined set of values.
