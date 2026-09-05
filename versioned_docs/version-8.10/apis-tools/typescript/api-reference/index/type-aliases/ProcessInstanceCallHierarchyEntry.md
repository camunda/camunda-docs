---
title: "Type Alias: ProcessInstanceCallHierarchyEntry"
sidebar_label: "ProcessInstanceCallHierarchyEntry"
mdx:
  format: md
---

# Type Alias: ProcessInstanceCallHierarchyEntry

```ts
type ProcessInstanceCallHierarchyEntry = object;
```

## Properties

### processDefinitionKey

```ts
processDefinitionKey: ProcessDefinitionKey;
```

The key of the process definition.

---

### processDefinitionName

```ts
processDefinitionName: string;
```

The name of the process definition (fall backs to the process definition id if not available).

---

### processInstanceKey

```ts
processInstanceKey: ProcessInstanceKey;
```

The key of the process instance.
