---
title: "Type Alias: ProcessInstanceResult"
sidebar_label: "ProcessInstanceResult"
mdx:
  format: md
---

# Type Alias: ProcessInstanceResult

```ts
type ProcessInstanceResult = object;
```

Process instance search response item.

## Properties

### businessId

```ts
businessId: BusinessId | null;
```

The business id associated with this process instance.

---

### endDate

```ts
endDate: string | null;
```

The completion or termination time of the process instance.

---

### hasIncident

```ts
hasIncident: boolean;
```

Whether this process instance has a related incident or not.

---

### parentElementInstanceKey

```ts
parentElementInstanceKey: ElementInstanceKey | null;
```

The parent element instance key.

---

### parentProcessInstanceKey

```ts
parentProcessInstanceKey: ProcessInstanceKey | null;
```

The parent process instance key.

---

### processDefinitionId

```ts
processDefinitionId: ProcessDefinitionId;
```

---

### processDefinitionKey

```ts
processDefinitionKey: ProcessDefinitionKey;
```

The process definition key.

---

### processDefinitionName

```ts
processDefinitionName: string | null;
```

The process definition name.

---

### processDefinitionVersion

```ts
processDefinitionVersion: number;
```

The process definition version.

---

### processDefinitionVersionTag

```ts
processDefinitionVersionTag: string | null;
```

The process definition version tag.

---

### processInstanceKey

```ts
processInstanceKey: ProcessInstanceKey;
```

The key of this process instance.

---

### rootProcessInstanceKey

```ts
rootProcessInstanceKey: ProcessInstanceKey | null;
```

The key of the root process instance. The root process instance is the top-level
ancestor in the process instance hierarchy. This field is only present for data
belonging to process instance hierarchies created in version 8.9 or later.

---

### startDate

```ts
startDate: string;
```

The start time of the process instance.

---

### state

```ts
state: ProcessInstanceStateEnum;
```

---

### tags

```ts
tags: TagSet;
```

---

### tenantId

```ts
tenantId: TenantId;
```
