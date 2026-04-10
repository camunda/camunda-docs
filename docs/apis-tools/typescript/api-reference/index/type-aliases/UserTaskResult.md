---
title: "Type Alias: UserTaskResult"
sidebar_label: "UserTaskResult"
mdx:
  format: md
---

# Type Alias: UserTaskResult

```ts
type UserTaskResult = object;
```

## Properties

### assignee

```ts
assignee: string | null;
```

The assignee of the user task.

---

### candidateGroups

```ts
candidateGroups: string[];
```

The candidate groups for this user task.

---

### candidateUsers

```ts
candidateUsers: string[];
```

The candidate users for this user task.

---

### completionDate

```ts
completionDate: string | null;
```

The completion date of a user task.

---

### creationDate

```ts
creationDate: string;
```

The creation date of a user task.

---

### customHeaders

```ts
customHeaders: object;
```

Custom headers for the user task.

#### Index Signature

```ts
[key: string]: string
```

---

### dueDate

```ts
dueDate: string | null;
```

The due date of a user task.

---

### elementId

```ts
elementId: ElementId;
```

The element ID of the user task.

---

### elementInstanceKey

```ts
elementInstanceKey: ElementInstanceKey;
```

The key of the element instance.

---

### externalFormReference

```ts
externalFormReference: string | null;
```

The external form reference.

---

### followUpDate

```ts
followUpDate: string | null;
```

The follow date of a user task.

---

### formKey

```ts
formKey: FormKey | null;
```

The key of the form.

---

### name

```ts
name: string | null;
```

The name for this user task.

---

### priority

```ts
priority: number;
```

The priority of a user task. The higher the value the higher the priority.

---

### processDefinitionId

```ts
processDefinitionId: ProcessDefinitionId;
```

The ID of the process definition.

---

### processDefinitionKey

```ts
processDefinitionKey: ProcessDefinitionKey;
```

The key of the process definition.

---

### processDefinitionVersion

```ts
processDefinitionVersion: number;
```

The version of the process definition.

---

### processInstanceKey

```ts
processInstanceKey: ProcessInstanceKey;
```

The key of the process instance.

---

### processName

```ts
processName: string | null;
```

The name of the process definition.
This is `null` if the process has no name defined.

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
state: UserTaskStateEnum;
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

---

### userTaskKey

```ts
userTaskKey: UserTaskKey;
```

The key of the user task.
