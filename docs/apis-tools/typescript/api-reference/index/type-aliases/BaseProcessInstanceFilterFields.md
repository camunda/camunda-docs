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
optional batchOperationId?: StringFilterProperty;
```

The batch operation id.
**Deprecated**: Use `batchOperationKey` instead. This field will be removed in a future release. If both `batchOperationId` and `batchOperationKey` are provided, the request will be rejected with a 400 error.

#### Deprecated

---

### batchOperationKey?

```ts
optional batchOperationKey?: StringFilterProperty;
```

The batch operation key.

---

### businessId?

```ts
optional businessId?: StringFilterProperty;
```

The business id associated with the process instance.

---

### elementId?

```ts
optional elementId?: StringFilterProperty;
```

The element id associated with the process instance.

---

### elementInstanceState?

```ts
optional elementInstanceState?: ElementInstanceStateFilterProperty;
```

The state of the element instances associated with the process instance.

---

### endDate?

```ts
optional endDate?: DateTimeFilterProperty;
```

The end date.

---

### errorMessage?

```ts
optional errorMessage?: StringFilterProperty;
```

The error message related to the process.

---

### hasElementInstanceIncident?

```ts
optional hasElementInstanceIncident?: boolean;
```

Whether the element instance has an incident or not.

---

### hasIncident?

```ts
optional hasIncident?: boolean;
```

Whether this process instance has a related incident or not.

---

### hasRetriesLeft?

```ts
optional hasRetriesLeft?: boolean;
```

Whether the process has failed jobs with retries left.

---

### incidentErrorHashCode?

```ts
optional incidentErrorHashCode?: IntegerFilterProperty;
```

The incident error hash code, associated with this process.

---

### parentElementInstanceKey?

```ts
optional parentElementInstanceKey?: ElementInstanceKeyFilterProperty;
```

The parent element instance key.

---

### parentProcessInstanceKey?

```ts
optional parentProcessInstanceKey?: ProcessInstanceKeyFilterProperty;
```

The parent process instance key.

---

### processInstanceKey?

```ts
optional processInstanceKey?: ProcessInstanceKeyFilterProperty;
```

The key of this process instance.

---

### startDate?

```ts
optional startDate?: DateTimeFilterProperty;
```

The start date.

---

### state?

```ts
optional state?: ProcessInstanceStateFilterProperty;
```

The process instance state.

---

### tags?

```ts
optional tags?: TagSet;
```

---

### tenantId?

```ts
optional tenantId?: StringFilterProperty;
```

The tenant id.

---

### variables?

```ts
optional variables?: VariableValueFilterProperty[];
```

The process instance variables.
