---
title: "Type Alias: BaseProcessInstanceFilterFields"
sidebar_label: "BaseProcessInstanceFilterFields"
mdx:
  format: md
---

# Type Alias: BaseProcessInstanceFilterFields

```ts
type BaseProcessInstanceFilterFields = object;
```

Base process instance search filter.

## Properties

### ~~batchOperationId?~~

```ts
batchOperationId?: StringFilterProperty;
```

The batch operation id.
**Deprecated**: Use `batchOperationKey` instead. This field will be removed in a future release. If both `batchOperationId` and `batchOperationKey` are provided, the request will be rejected with a 400 error.

#### Deprecated

---

### batchOperationKey?

```ts
batchOperationKey?: StringFilterProperty;
```

The batch operation key.

---

### businessId?

```ts
businessId?: StringFilterProperty;
```

The business id associated with the process instance.

---

### elementId?

```ts
elementId?: StringFilterProperty;
```

The element id associated with the process instance.

---

### elementInstanceState?

```ts
elementInstanceState?: ElementInstanceStateFilterProperty;
```

The state of the element instances associated with the process instance.

---

### endDate?

```ts
endDate?: DateTimeFilterProperty;
```

The end date.

---

### errorMessage?

```ts
errorMessage?: StringFilterProperty;
```

The error message related to the process.

---

### hasElementInstanceIncident?

```ts
hasElementInstanceIncident?: boolean;
```

Whether the element instance has an incident or not.

---

### hasIncident?

```ts
hasIncident?: boolean;
```

Whether this process instance has a related incident or not.

---

### hasRetriesLeft?

```ts
hasRetriesLeft?: boolean;
```

Whether the process has failed jobs with retries left.

---

### incidentErrorHashCode?

```ts
incidentErrorHashCode?: IntegerFilterProperty;
```

The incident error hash code, associated with this process.

---

### parentElementInstanceKey?

```ts
parentElementInstanceKey?: ElementInstanceKeyFilterProperty;
```

The parent element instance key.

---

### parentProcessInstanceKey?

```ts
parentProcessInstanceKey?: ProcessInstanceKeyFilterProperty;
```

The parent process instance key.

---

### processInstanceKey?

```ts
processInstanceKey?: ProcessInstanceKeyFilterProperty;
```

The key of this process instance.

---

### startDate?

```ts
startDate?: DateTimeFilterProperty;
```

The start date.

---

### state?

```ts
state?: ProcessInstanceStateFilterProperty;
```

The process instance state.

---

### suspendedDate?

```ts
suspendedDate?: DateTimeFilterProperty;
```

The time this process instance most recently entered the SUSPENDED state.
This is cleared (null) again once the process instance is resumed.

---

### tags?

```ts
tags?: TagSet;
```

---

### tenantId?

```ts
tenantId?: StringFilterProperty;
```

The tenant id.

---

### variables?

```ts
variables?: VariableValueFilterProperty[];
```

The process instance variables.
