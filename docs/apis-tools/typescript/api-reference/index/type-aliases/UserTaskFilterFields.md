---
title: "Type Alias: UserTaskFilterFields"
sidebar_label: "UserTaskFilterFields"
mdx:
  format: md
---

# Type Alias: UserTaskFilterFields

```ts
type UserTaskFilterFields = object;
```

User task filter fields.

## Properties

### assignee?

```ts
assignee?: StringFilterProperty;
```

The assignee of the user task.

---

### businessId?

```ts
businessId?: StringFilterProperty;
```

The business ID of the owning process instance the user task belongs to. This only works for user tasks created with 8.10 and onwards. Tasks from prior versions don't contain this data and cannot be found.

---

### candidateGroup?

```ts
candidateGroup?: StringFilterProperty;
```

The candidate group for this user task.

---

### candidateUser?

```ts
candidateUser?: StringFilterProperty;
```

The candidate user for this user task.

---

### completionDate?

```ts
completionDate?: DateTimeFilterProperty;
```

The user task completion date.

---

### creationDate?

```ts
creationDate?: DateTimeFilterProperty;
```

The user task creation date.

---

### dueDate?

```ts
dueDate?: DateTimeFilterProperty;
```

The user task due date.

---

### elementId?

```ts
elementId?: ElementId;
```

The element ID of the user task.

---

### elementInstanceKey?

```ts
elementInstanceKey?: ElementInstanceKey;
```

The key of the element instance.

---

### followUpDate?

```ts
followUpDate?: DateTimeFilterProperty;
```

The user task follow-up date.

---

### isSuspended?

```ts
isSuspended?: boolean | null;
```

Whether the user task is suspended because its owning process instance is suspended.

---

### localVariables?

```ts
localVariables?: VariableValueFilterProperty[];
```

The local variables of the user task.

---

### name?

```ts
name?: StringFilterProperty;
```

The task name. This only works for data created with 8.8 and onwards. Instances from prior versions don't contain this data and cannot be found.

---

### priority?

```ts
priority?: IntegerFilterProperty;
```

The priority of the user task.

---

### processDefinitionId?

```ts
processDefinitionId?: ProcessDefinitionIdFilterProperty;
```

The ID of the process definition.

---

### processDefinitionKey?

```ts
processDefinitionKey?: ProcessDefinitionKeyFilterProperty;
```

The key of the process definition.

---

### processInstanceKey?

```ts
processInstanceKey?: ProcessInstanceKeyFilterProperty;
```

The key of the process instance.

---

### processInstanceVariables?

```ts
processInstanceVariables?: VariableValueFilterProperty[];
```

The variables of the process instance.

---

### state?

```ts
state?: UserTaskStateFilterProperty;
```

The user task state.

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

Tenant ID of this user task.

---

### userTaskKey?

```ts
userTaskKey?: UserTaskKey;
```

The key for this user task.
